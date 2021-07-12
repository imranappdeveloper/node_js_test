const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../model/User');

module.exports = function (req, res, next) {

    try {
        const token = req.headers.token

        const jwtData = jwt.verify(token, process.env.JWT_TOKEN);
        if (!jwtData) return res.send('Access denied !!! ');
        else req.user = jwtData._id;

        console.log(req.user);
        // console.log(User.findById(req.user));

        next();
    } catch (err) {
        res.send(err);
    }

}