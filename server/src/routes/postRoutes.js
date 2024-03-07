const express = require('express');
const { createPost, getPosts } = require('../controllers/postController');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const postRoutes = express.Router();

// Route to create a new post
postRoutes.post('/',authenticateToken ,createPost);

// Route to get all posts
postRoutes.get('/',authenticateToken ,getPosts);

function authenticateToken(req,res,next){
    try {
        let mystore = JSON.parse(req.sessionStore.sessions[req.headers['sesid']])
        let token = mystore['token']
        if (!token) {
            // Handle case where token is not found
            res.status(401).send('Unauthorized');
            return;
        }
        
        jwt.verify(token, process.env.SECRET_KEY , (err, decoded) => {
            if (err) {
            // Token verification failed
            if (err.name === 'TokenExpiredError') {
                console.log('Token has expired');
            } else {
                console.error('Token verification failed:', err.message);
            }
            } else {
            // Token is valid
            req.userId = decoded.id
            }
        })
        
        next()
        
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = postRoutes;
