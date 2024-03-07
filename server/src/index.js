const express = require('express')
const dbConfig = require('./config/dbConfig')
const authRoutes = require('./routes/authRoutes')
const postRoutes = require('./routes/postRoutes')
const cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' });
require('dotenv').config()

const app = express()

app.use(cookieParser())

app.use(session({
    secret:process.env.SECRET_KEY,
    resave:false,
    saveUninitialized:false
}));

app.use(cors())
app.use(bodyParser.json())


dbConfig.connect()
async function check(req,res,next){
    let mystore = await JSON.parse(req.sessionStore.sessions[req.headers['sesid']])
    req.sessionID = req.headers['sesid']
    next()
}
app.use("/auth",upload.single('pfp') , authRoutes)


app.use("/posts",check, postRoutes)

app.get("/", (req, res)=>{
    res.status(200).send("hello")
})

app.listen(3001,()=>{
    console.log("server is runnnig");
})
