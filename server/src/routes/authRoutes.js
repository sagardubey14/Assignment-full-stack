const express = require('express')
const {signup, signin} = require('../controllers/authController')

const authRoutes = express();
function check(req,res,next){
    console.log('/signup')
    next()
}
authRoutes.post("/signup",check, signup)
authRoutes.post("/signin",check , signin)

module.exports = authRoutes;