const express = require('express')
const app = express()
const port = process.env.PORT || 4000

// Aquí vamos a importar todas las rutas
const studentsRouter = require('./routes/students')
const areasRouter = require('./routes/areas')
const ratingsRouter = require('./routes/ratings')

// Middlewares
app.use(express.json())

// Rutas
app.use("/students", studentsRouter)
app.use("/areas", areasRouter)
app.use("/ratings", ratingsRouter)

app.listen(port, ()=>{
    console.log(`Servidor escuchando en el puerto ${port}`)
})