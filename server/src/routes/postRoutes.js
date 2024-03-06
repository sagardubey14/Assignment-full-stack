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
        let mystore = JSON.parse(req.sessionStore.sessions[req.headers['sesid']])
        let token = mystore['token']
        if (!token) {
            // Handle case where token is not found
            res.status(401).send('Unauthorized');
            return;
        }
        
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
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
            console.log(req.userId);
            }
        })
        
        next()
        
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = postRoutes;
