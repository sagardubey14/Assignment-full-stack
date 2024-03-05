const express = require('express')
const dbConfig = require('./config/dbConfig')
const authRoutes = require('./routes/authRoutes')
const postRoutes = require('./routes/postRoutes')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bodyParser = require('body-parser')


const app = express()
app.use(cors())
app.use(bodyParser.json())
dbConfig.connect()
function check(req,res,next){
    console.log(req.body)
    next()
}
app.use("/auth",check, authRoutes)


app.use("/posts",check , postRoutes)

app.get("/", (req, res)=>{
    res.status(200).send("hello")
})

app.listen(3001,()=>{
    console.log("server is runnnig");
})
