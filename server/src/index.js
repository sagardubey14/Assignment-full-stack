const express = require('express')
const dbConfig = require('./config/dbConfig')
const authRoutes = require('./routes/authRoutes')
const postRoutes = require('./routes/postRoutes')
const cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser');
const { SECRET_KEY} = require('./config/tokenConfig');
const multer = require('multer')
const upload = multer({ dest: '../uploads/' });


const app = express()

app.use(cookieParser())

const singleUpload = upload.single('pfp');

// Middleware function to handle file upload
function check1(req, res, next) {
    singleUpload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred during file upload
            return res.status(400).json({ error: err.message });
        } else if (err) {
            // An unknown error occurred during file upload
            return res.status(500).json({ error: 'Unknown error occurred' });
        }
        // No errors, continue to the next middleware or route handler
        next();
    });
}
app.use(session({
    secret:SECRET_KEY,
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
app.use("/auth",check1 , authRoutes)


app.use("/posts",check, postRoutes)

app.get("/", (req, res)=>{
    res.status(200).send("hello")
})

app.listen(3001,()=>{
    console.log("server is runnnig");
})
