const db = require('debug')('app:db');
const _ = require('lodash');
const Joi = require('joi');
var crypto = require('crypto');
const express = require('express');
const router = express.Router();

const User = require('../models/users').User;

router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({
        email: req.body.email
    });
    if (!user) return res.status(400).send('Invalid email or Password');

    try {
        const digest = await crypto.createHash('sha256').update(`${req.body.email} ${req.body.password}`, 'utf-8').digest('hex');
        db(digest);
        db(user.password);
        if (digest === user.password)
            res.send('User Authenticated');
        else
            return res.status(400).send('Invalid email or Password');
    } catch (error) {
        res.status(400).send(error.message);
        db(error.message);
    }
});

function validate(user) {
    const schema = {
        email: Joi.string().max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    };
    return Joi.validate(user, schema);
}

module.exports = router;