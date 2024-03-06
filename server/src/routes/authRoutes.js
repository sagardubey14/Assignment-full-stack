const express = require('express')

const {signup, signin, logout} = require('../controllers/authController')

const authRoutes = express();
// function check(req,res,next){
//     upload.single('pfp')
//     console.log(req.file)
//     next()

// }
// Multer middleware for file upload

authRoutes.post("/signup" , signup)
authRoutes.post("/signin", signin)
authRoutes.post("/logout", logout)

module.exports = authRoutes;