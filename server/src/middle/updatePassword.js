const userModel = require('../models/user');
const bcrypt = require('bcrypt');

const updatePasswordMiddleware = async (req, res, next) => {
    console.log(req.body);
    try {

        // Extract the username and new password from the request body
        const { email, pass , newPass } = req.body;

        // Find the user by username
        const user = await userModel.findOne({ email: email });
        
        const matchPassword = await bcrypt.compare(pass, user.password);
        if (!matchPassword) {
            return res.status(400).send("Invalid password");
        }
        
        const hashedPass = await bcrypt.hash(newPass, 10);
        user.password = hashedPass;

        // Save the updated user object
        await user.save();

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle errors
        console.error('Error updating password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {updatePasswordMiddleware}