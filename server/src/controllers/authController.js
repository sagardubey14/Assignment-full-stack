const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config()
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// User signup function
const signup = async (req, res) => {
    const {name, username, email, password, pfp } = req.body;
    try {
        // Check if user with the provided email already exists
        const existingUser = await userModel.findOne({ email: email });

        if (existingUser) {
            return res.status(400).send("User already exists");
        }

        // Hash password
        const hashedPass = await bcrypt.hash(password, 10);
        
        let encodedPfp = ''
        // Upload profile picture to Cloudinary
        
        if (req.file){
        await cloudinary.uploader.upload(req.file.path, (error, result) => {
            if (error) {
              console.error(error);
              return res.status(500).json({ message: 'Error uploading file to Cloudinary' });
            }
            // File uploaded successfully to Cloudinary, delete local file
            encodedPfp = result.secure_url;
            // Delete local file
            fs.unlinkSync(req.file.path);
        });
        }
        console.log(encodedPfp);

        // Create new user
        const newUser = await userModel.create({
            name:name,
            email: email,
            username: username,
            password: hashedPass,
            pfp:encodedPfp,
        });

        // Generate JWT token
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.SECRET_KEY , {
            expiresIn: process.env.TOKEN_EXPIRATION_TIME
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

// User signin function
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
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.SECRET_KEY , {
            expiresIn: process.env.TOKEN_EXPIRATION_TIME
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

// User logout function
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
