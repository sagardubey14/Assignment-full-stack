const express = require('express');
const { createPost, getPosts } = require('../controllers/postController');
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../config/tokenConfig')

const postRoutes = express.Router();

// Route to create a new post
postRoutes.post('/',authenticateToken ,createPost);

// Route to get all posts
postRoutes.get('/',authenticateToken ,getPosts);

function authenticateToken(req,res,next){
    try {
        const authHeader = req.headers['authorization']
        if (authHeader){
            const token = authHeader.split(" ")[1]
            let user = jwt.verify(token,SECRET_KEY)
            req.userId = user.id
            req.token = token
        }
        else{
            res.status(401).send("unaothrized")
        }
        next()
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = postRoutes;
