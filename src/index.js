const express = require('express')
const app = express()
const port = process.env.PORT || 4000

// Aquí vamos a importar todas las rutas
const ratingsRouter = require('./routes/ratings')

// Middlewares
/* A middleware that parses the body of the request and makes it available in the req.body property. */
app.use(express.json())

// Rutas
app.use("/ratings", ratingsRouter)

app.listen(port, ()=>{
    console.log(`Servidor escuchando en el puerto ${port}`)
})