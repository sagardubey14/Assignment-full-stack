const express = require('express')
const dbConfig = require('./config/dbConfig')
const authRoutes = require('./routes/authRoutes')
const postRoutes = require('./routes/postRoutes')
const jwt = require('jsonwebtoken')


const app = express()
app.use(express.json())
dbConfig.connect()
app.use("/auth", authRoutes)


app.use("/posts", postRoutes)

app.get("/", (req, res)=>{
    res.status(200).send("hello")
})

app.listen(3001,()=>{
    console.log("server is runnnig");
})
