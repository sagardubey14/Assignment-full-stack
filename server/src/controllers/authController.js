const express = require('express')
const session = require('express-session')
const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { SECRET_KEY, TOKEN_EXPIRATION_TIME } = require('../config/tokenConfig');

// const encodeImageToBase64 = (filePath) => {
//     // Read image file synchronously
//     const imageData = fs.readFileSync(filePath);
//     // Encode image data to base64
//     const base64Image = Buffer.from(imageData).toString('base64');
//     return base64Image;
// };



const signup = async (req, res) => {
    const {name, username, email, password, pfp } = req.body;
    try {
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }
        const hashedPass = await bcrypt.hash(password, 10);
        let encodedPfp = ''
        // if(pfp === ''){
        // encodedPfp = ''
        // }else{
        // encodedPfp = `data:image/png;base64,${encodeImageToBase64(pfp)}`
        // }
        const newUser = await userModel.create({
            name:name,
            email: email,
            username: username,
            password: hashedPass,
            pfp:encodedPfp,
        });
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, SECRET_KEY, {
            expiresIn: TOKEN_EXPIRATION_TIME
        });

        req.session.token = token

        res.status(200).json({ user: {
            name:newUser.name,
            email:newUser.email,
            username:newUser.username,
            pfp:username.pfp
        },sesID:req.sessionID});

    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong");
    }
};

const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email: email });
        if (!existingUser) {
            return res.status(404).send("User not found");
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchPassword) {
            return res.status(400).send("Invalid password");
        }
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY, {
            expiresIn: TOKEN_EXPIRATION_TIME
        });

        req.session.token = token

        res.status(200).json({ user: {
            name:existingUser.name,
            email:existingUser.email,
            username:existingUser.username,
            pfp:existingUser.pfp
        },sesID:req.sessionID});

    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong");
    }
};

const logout =async(req, res)=>{

    req.sessionStore.destroy(req.sessionID, function(err) {
        if (err) {
            // Handle error
            return res.status(500).send('Error destroying session');
        }

        // Session destroyed succesassfully
        res.send('Session destroyed');
    });
}

module.exports = { signup, signin, logout };
