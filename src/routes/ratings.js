const express = require('express')
const client = require('../utils/connectdb/conn')
const {ObjectId} = require("mongodb")
const convertDate = require("../utils/functions/date")

/* Creating a new router object. */
const ratings = express.Router()

// Get all ratings
/* A function that is called when the user makes a GET request to the route /. */
ratings.get("/", async(req, res)=>{
    try {
        await client.connect()
        const results = await client.db("classify").collection("calificaciones").find({}).toArray()
        if(Array.isArray(results) >= 1){
            res.status(200).json({
                status: 200,
                amount_results: results.length,
                data: results 
            })
        }else{
           res.status(404).json({
            status: 404,
            message: "ratings not found"
           })
        }
    } finally {
    }
})

// Get one ratings
/* A function that is called when the user makes a GET request to the route /:id. */
ratings.get("/:id", async(req, res)=>{
    let id = req.params.id
    try {
        await client.connect()
        const result = await client.db("classify").collection("calificaciones").findOne({"_id": new ObjectId(id)})
        if(result){
            res.status(200).json({
                status: 200,
                data: result 
            })
        }else{
           res.status(404).json({
            status: 404,
            message: "Ratings not found"
           })
        }
    } finally {
    }
})


// Create rating
/* Creating a new rating. */
ratings.post("/", async(req, res)=>{
    const body = req.body
    try {
        await client.connect()
        body["fecha_evaluacion"] = new Date()
        const result = await client.db("classify").collection("calificaciones").insertOne(body)
        if(result.insertedId){
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


// Create many rating
/* Creating a new rating. */
ratings.post("/create_many_ratings", async(req, res)=>{
    const body = req.body
    try {
        await client.connect()
        body.forEach(element => {
            element["fecha_evaluacion"] = new Date()
        });
        const result = await client.db("classify").collection("calificaciones").insertMany(body)
        console.log(result)
        if(result.insertedCount === body.length){
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

// Update ratings 
/* Updating the rating with the id that is passed in the url. */
ratings.patch("/:id", async(req, res)=>{
    const id = req.params.id
    const body = req.body
    try {
        await client.connect()

        body["fecha_evaluacion"] = convertDate(body["fecha_evaluacion"])

        const result = await client.db("classify").collection("calificaciones").updateOne({_id: new ObjectId(id)}, {$set: body, $currentDate: { lastModified: true }})

        if(result.modifiedCount <= 0){
            res.status(404).json({
                status: 404,
                message: "rating not found"
            })
        }else{
            res.status(201).json({
                status: 201,
                message: 'updated rating',
                data: result
            })
        }
    } finally {
    }
})


// Update ratings - upsert
/* Updating the rating with the id that is passed in the url. */
ratings.patch("/:id/upsert", async(req, res)=>{
    const id = req.params.id
    const body = req.body
    try {
        await client.connect()

        body["fecha_evaluacion"] = convertDate(body["fecha_evaluacion"])

        const result = await client.db("classify").collection("calificaciones").updateOne({_id: new ObjectId(id)}, {$set: body}, {upsert: true})

        if(result.modifiedCount <= 0){
            res.status(404).json({
                status: 404,
                message: "rating not found"
            })
        }else{
            res.status(201).json({
                status: 201,
                message: 'updated rating',
                data: result
            })
        }
    } finally {
    }
})


// Update areas - upsert
/* Updating all the documents in the collection that have the word "Creative" in the field "asignatura"
with the body of the request. */
ratings.put("/update_many_ratings/upsert", async(req, res)=>{
    const body = req.body
    try {
        await client.connect()

        if(body.hasOwnProperty('fecha_evaluacion')){
            body["fecha_evaluacion"] = convertDate(body["fecha_evaluacion"])
        }

        const result = await client.db("classify").collection("calificaciones").updateMany({asignatura: {$regex: /Creative/ }}, {$set: body}, {upsert: true})

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


// Update areas
/* Updating all the documents in the collection that have the word "Creative" in the field "asignatura"
with the body of the request. */
ratings.put("/update_many_ratings", async(req, res)=>{
    const body = req.body
    try {
        await client.connect()

        if(body.hasOwnProperty('fecha_evaluacion')){
            body["fecha_evaluacion"] = convertDate(body["fecha_evaluacion"])
        }

        const result = await client.db("classify").collection("calificaciones").updateMany({asignatura: {$regex: /Creative/}}, {$set: body})

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
/* Deleting the rating with the id that is passed in the url. */
ratings.delete("/:id", async(req, res) => {
    const id = req.params.id
    try {
        await client.connect()
        const result = await client.db("classify").collection("calificaciones").deleteOne({"_id": new ObjectId(id)})
        if(result.deletedCount >= 1){
            res.status(200).json({
                status: 200,
                message: 'deleted rating',
                data: result
            })
        }else{
            res.status(404).json({
                status: 404,
                message: "rating not found"
            })
        }
    } finally{
        
    }
})

module.exports = ratings