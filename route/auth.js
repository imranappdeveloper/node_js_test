const router = require('express').Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation/validation')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {

    //Validation of parameters
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    //Validation of duplicate email
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send('Email already exists...')

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    const user = User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {

        const registerUser = await user.save();
        res.json(registerUser);

    } catch (err) {
        res.status(400).send(err);
    }
})

router.post('/login', async (req, res) => {

    //Validation of parameters
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    try {

        //Validation of email available
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('User not available')

        //Validaion of password
        const validPassword = await bcryptjs.compare(req.body.password,user.password);
        if(!validPassword) return res.status(400).send('Password incorrect');

        console.log(user);
        const token = jwt.sign({_id: user._id}, process.env.JWT_TOKEN);
        res.send(token);

    } catch (err) {
        res.status(400).send(err);
    }
})

module.exports = router;