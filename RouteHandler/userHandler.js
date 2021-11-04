const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require('../Schemas/userSchema');

// create model
const User = mongoose.model('User', userSchema);

const router = express.Router();
// signup user
router.post('/signup', async (req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashPassword,
        });
        await newUser.save().then(() => {
            res.status(200).send({
                message: 'Signup was successful',
            });
        });
    } catch (error) {
        res.send(error.message);
    }
});
router.post('/login', async (req, res) => {
    try {
        const user = await User.find({ username: req.body.username });
        if (user && user.length > 0) {
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);
            if (isValidPassword) {
                // generate token
                const token = jwt.sign(
                    {
                        username: user[0].username,
                        name: user[0].name,
                        userId: user[0]._id,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: '1h',
                    },
                );
                res.status(200).send({
                    access_token: token,
                    message: 'Login successful!',
                });
            } else {
                res.status(401).send({
                    error: 'Authentication failed!',
                });
            }
        } else {
            res.status(401).send({
                error: 'Authentication failed!',
            });
        }
    } catch (error) {
        res.send({
            error: error.message,
        });
    }
});

module.exports = router;
