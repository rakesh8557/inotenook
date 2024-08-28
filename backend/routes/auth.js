const express = require('express');

const router = express.Router();

const User = require('../models/Users');

const { body, validationResult } = require('express-validator');

const bcryptjs = require('bcryptjs');

const jwt = require('jsonwebtoken');

const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'RAKESH_FIRST_JWT_TOKEN'

// Create user Api : POST | "api/auth/create"

router.post('/create', [

    body('name', 'Enter a valid name').isLength({min : 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password','Enter a valid password').isLength({min : 5})

], async  (req,res) => {

    const errors = validationResult(req);
    let success = false
    //error from express validator using models schema
    if(!errors.isEmpty()) {
        const formattedErrors = errors.array().map(err => ({
            field: err.param,
            message: err.msg
        }));
        return res.status(400).json({ success, errors: formattedErrors });
    }

    try {

        let user = await User.findOne({email : req.body.email});
        //Custom error for email can also use index on email and use exception for  mongoose
        if(user) {
            return res.status(400).json({success, errors : 'User with this email already exists'});
        }

        //hashing for password
        const salt = await bcryptjs.genSalt(10);
        const hashPass = await bcryptjs.hash( req.body.password, salt);
        //Created a new user in Mongo db
        user  = await User.create({
            name : req.body.name,
            email : req.body.email,
            password : hashPass
        });

        const authenticationData = {
            user_id : user.id
        }

        const authToken = jwt.sign(authenticationData, JWT_SECRET);

        success =true;
        res.json({success, authToken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }

})


// Verify user Api : POST | "api/auth/login"
router.post('/login', [
    
    body('email', 'Enter a valid email').isEmail(),
    body('password','Enter a valid password').exists()

], async  (req,res) => {

    const errors = validationResult(req);
    let success = false;
    //error from express validator using models schema
    if(!errors.isEmpty()) {
        const formattedErrors = errors.array().map(err => ({
            field: err.param,
            message: err.msg
        }));
        return res.status(400).json({success, errors: formattedErrors });
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({success, errors : 'Please login with correct Credentials'});
        }

        const passwordCompare = await bcryptjs.compare(password, user.password);

        if(!passwordCompare) {
            return res.status(400).json({success, errors : 'Please login with correct Credentials'});
        }

        const data  = {
            user_id : user.id
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true
        res.json({success, authToken});

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }
})

// Get user details : POST | api/auth/getUserDetails
router.post('/getUserDetails', fetchuser, async  (req,res) => {
    try {
        userId = req.user_id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }
})

module.exports = router;