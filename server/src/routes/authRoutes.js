const express = require('express')
const {signup, signin} = require('../controllers/authController')

const authRoutes = express();

authRoutes.post("/signup", signup)
authRoutes.post("/signin", signin)

module.exports = authRoutes;