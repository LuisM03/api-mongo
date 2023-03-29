const express = require('express')
const client = require('../utils/connectdb/conn')
const {ObjectId} = require("mongodb")
const convertDate = require("../utils/functions/date")

const areas = express.Router()

// Get all areas
areas.get("/", async(req, res)=>{
    try {
        await client.connect()
        const results = await client.db("classify").collection("areas").find({}).toArray()
        if(Array.isArray(results) >= 1){
            res.status(200).json({
                status: 200,
                amount_results: results.length,
                data: results 
            })
        }else{
           res.status(404).json({
            status: 404,
            message: "areas not found"
           })
        }
    } finally {
    }
})


// Get one area
areas.get("/:id", async(req, res)=>{
    let id = req.params.id
    try {
        await client.connect()
        const result = await client.db("classify").collection("areas").findOne({"_id": new ObjectId(id)})
        if(result){
            res.status(200).json({
                status: 200,
                data: result 
            })
        }else{
           res.status(404).json({
            status: 404,
            message: "area not found"
           })
        }
    } finally {
    }
})


// Create area
areas.post("/", async(req, res)=>{
    const body = req.body
    try {
        await client.connect()
        body["fecha_creacion"] = new Date()
        const result = await client.db("classify").collection("areas").insertOne(body)
        if(result){
            res.status(201).json({
                status: 201,
                message: 'created area',
                data: result
            })
        }else{
            res.status(400).json({
                status: 400,
                message: "area not created"
            })
        }
    } finally {
    }
})


// Create areas
areas.post("/create_many_areas", async(req, res)=>{
    const body = req.body
    try {
        await client.connect()
        
        body.forEach(document => {
            document["fecha_creacion"] = new Date()
        });

        const result = await client.db("classify").collection("areas").insertMany(body)
        
        if(result){
            res.status(201).json({
                status: 201,
                message: 'created areas',
                data: result
            })
        }else{
            res.status(400).json({
                status: 400,
                message: "areas not created"
            })
        }


    } finally {
    }
})


// Update student - upsert
areas.patch("/:id", async(req, res)=>{
    const id = req.params.id
    const body = req.body
    try {
        await client.connect()

        body["fecha_creacion"] = convertDate(body["fecha_creacion"])

        const result = await client.db("classify").collection("areas").updateOne({_id: new ObjectId(id)}, {$set: body, $currentDate: { lastModified: true }}, {upsert: true})

        if(result.modifiedCount <= 0){
            res.status(404).json({
                status: 404,
                message: "area not found"
            })
        }else{
            res.status(201).json({
                status: 201,
                message: 'updated area',
                data: result
            })
        }
    } finally {
    }
})


// Update areas
areas.put("/update_many_areas", async(req, res)=>{
    const body = req.body
    try {
        await client.connect()

        body["fecha_creacion"] = convertDate(body["fecha_creacion"])

        const result = await client.db("classify").collection("areas").updateMany({nombre_completo: {$regex: /Mon/ }}, {$set: body}, {upsert: true})

        if(result.modifiedCount <= 0){
            res.status(404).json({
                status: 404,
                message: "areas not found"
            })
        }else{
            res.status(201).json({
                status: 201,
                message: 'updated areas many',
                data: result
            })
        }
    } finally {
    }
})


// Delete area
areas.delete("/:id", async(req, res) => {
    const id = req.params.id
    try {
        await client.connect()
        const result = await client.db("classify").collection("areas").deleteOne({"_id": new ObjectId(id)})
        if(result){
            res.status(200).json({
                status: 200,
                message: 'deleted student',
                data: result
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

module.exports = areas