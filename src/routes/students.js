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



module.exports = students
