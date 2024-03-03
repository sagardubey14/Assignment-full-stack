const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY, TOKEN_EXPIRATION_TIME } = require('../config/tokenConfig');

const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }
        const hashedPass = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            email: email,
            username: username,
            password: hashedPass
        });

        const token = jwt.sign({ email: newUser.email, id: newUser._id }, SECRET_KEY, {
            expiresIn: TOKEN_EXPIRATION_TIME
        });

        res.status(200).json({ user: newUser, token: token });
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
        res.status(200).json({ user: existingUser, token: token });
        // res.redirect(`/posts?user=${JSON.stringify(existingUser)}&token=${token}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong");
    }
};

module.exports = { signup, signin };
