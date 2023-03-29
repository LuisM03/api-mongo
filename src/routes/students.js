const express = require('express')
const client = require('../utils/connectdb/conn')
const {ObjectId} = require("mongodb")
const convertDate = require("../utils/functions/date")


const students = express.Router()

// Get all students
students.get("/", async(req, res)=>{
    try {
        await client.connect()
        const results = await client.db("classify").collection("estudiantes").find({}).toArray()
        if(Array.isArray(results) >= 1){
            res.status(200).json({
                status: 200,
                amount_results: results.length,
                data: results 
            })
        }else{
           res.status(404).json({
            status: 404,
            message: "students not found"
           })
        }
    } finally {
    }
})

// Get one student
students.get("/:id", async(req, res)=>{
    let id = req.params.id
    try {
        await client.connect()
        const result = await client.db("classify").collection("estudiantes").findOne({"_id": new ObjectId(id)})
        if(result){
            res.status(200).json({
                status: 200,
                data: result 
            })
        }else{
           res.status(404).json({
            status: 404,
            message: "student not found"
           })
        }
    } finally {
    }
})


// Create student
students.post("/", async(req, res)=>{
    const body = req.body
    try {
        await client.connect()
        body["fecha_nacimiento"] = convertDate(body["fecha_nacimiento"])
        
        const result = await client.db("classify").collection("estudiantes").insertOne(body)
        
        if(result){
            res.status(201).json({
                status: 201,
                message: 'created student',
                data: result
            })
        }else{
            res.status(400).json({
                status: 400,
                message: "student not created"
            })
        }
    } finally {
    }
})

// Create students
students.post("/create_students", async(req, res)=>{
    const body = req.body
    try {
        await client.connect()
        
        body.forEach(document => {
            document["fecha_nacimiento"] = convertDate(document["fecha_nacimiento"])
        });

        const result = await client.db("classify").collection("estudiantes").insertMany(body)
        
        if(result){
            res.status(201).json({
                status: 201,
                message: 'created students',
                data: result
            })
        }else{
            res.status(400).json({
                status: 400,
                message: "students not created"
            })
        }


    } finally {
    }
})


// Update student
students.patch("/:id", async(req, res)=>{
    const id = req.params.id
    const body = req.body
    try {
        await client.connect()
        
        body["fecha_nacimiento"] = convertDate(body["fecha_nacimiento"])

        const result = await client.db("classify").collection("estudiantes").updateOne({_id: new ObjectId(id)}, {$set: body})
        
        if(result){
            res.status(201).json({
                status: 201,
                message: 'updated students whitout upsert',
                data: result
            })
        }else{
            res.status(400).json({
                status: 400,
                message: "students not updated"
            })
        }
    } finally {
    }
})

// Update student
students.patch("/upsert/:id", async(req, res)=>{
    const id = req.params.id
    const body = req.body
    try {
        await client.connect()
        
        body["fecha_nacimiento"] = convertDate(body["fecha_nacimiento"])

        const result = await client.db("classify").collection("estudiantes").updateOne({_id: new ObjectId(id)}, {$set: body}, {upsert: true})
        
        if(result){
            res.status(201).json({
                status: 201,
                message: 'updated students with upsert',
                data: result
            })
        }else{
            res.status(400).json({
                status: 400,
                message: "students not updated"
            })
        }
    } finally {
    }
})

// Update student
students.put("/update_many", async(req, res)=>{
    const body = req.body
    try {
        await client.connect()

        const result = await client.db("classify").collection("estudiantes").updateMany({nombre_completo: {$regex: /Andres/g }}, {$set: body})
        
        if(result){
            res.status(201).json({
                status: 201,
                message: 'updated students many whitout upsert',
                data: result
            })
        }else{
            res.status(400).json({
                status: 400,
                message: "students not updated"
            })
        }
    } finally {
    }
})


// Update student upsert
students.put("/update_many/upsert", async(req, res)=>{
    const body = req.body
    try {
        await client.connect()

        body["fecha_nacimiento"] = convertDate(body["fecha_nacimiento"])

        const result = await client.db("classify").collection("estudiantes").updateMany({nombre_completo: {$regex: /Kil/g }}, {$set: body}, {upsert: true})
        
        if(result){
            res.status(201).json({
                status: 201,
                message: 'updated students many whitout upsert',
                data: result
            })
        }else{
            res.status(400).json({
                status: 400,
                message: "students not updated"
            })
        }
    } finally {
    }
})


students.delete("/:id", async(req, res) => {
    const id = req.params.id
    try {
        await client.connect()
        const result = await client.db("classify").collection("estudiantes").deleteOne({"_id": new ObjectId(id)})
        if(result){
            res.status(204).json({
                status: 204,
                message: 'deleted student',
            })
        }else{
            res.status(404).json({
                status: 404,
                message: "student not found"
            })
        }
    } finally{
        
    }
})

module.exports = students