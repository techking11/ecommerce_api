const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password, "nma1132"
        ).toString(),
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }

});

// Login
router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        });

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password, "nma1132"
        );

        const originalPassword = hashedPassword.toString(CryptoJS.enc.utf8);

        originalPassword !== req.body.password && 
        res.status(401).json("Wrong credentials !");

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, "nma1132", {expiresIN: "3d"});

        const { password, ...others} = user._doc;
        res.status(200).json(...others, accessToken);

    } catch (error) {
        res.status(500).json(err);
    }
});

module.exports = router;