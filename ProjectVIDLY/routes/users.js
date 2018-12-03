const db = require('debug')('app:db');
const _ = require('lodash');
const mongoose = require('mongoose');
var crypto = require('crypto');
const express = require('express');
const router = express.Router();
const {
    User,
    validate
} = require('../models/users');

// router.get('/', async (req, res) => {
//     res.send(await User.find().sort('name'));
// });

router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        let user = new User(_.pick(req.body, ['name', 'email', 'password']))
        const hash = await crypto.createHash('sha256');
        user.password = await hash.update(`${req.body.email} ${req.body.password}`, 'utf-8').digest('hex');
        await user.save();
        res.send(_.pick(user, ['_id', 'name', 'email']));
    } catch (error) {
        res.status(400).send(error.message);
        db(error.message);
    }
});

// router.put('/:id', async (req, res) => {
//     const {
//         error
//     } = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     try {
//         const hash = crypto.createHash('sha256');
//         const digest = hash.update(`${req.body.email} ${req.body.password}`, 'utf-8').digest('hex');

//         const user = await User.updateOne({
//             email: req.params.id
//         }, {
//             $set: {
//                 name: req.body.name,
//                 email: req.body.email,
//                 password: digest
//             }
//         });
//         res.send(user);
//     } catch (error) {
//         db(error.message);
//         return res.status(404).send(error.message);
//     }
// });

// router.delete('/:id', async (req, res) => {
//     const user = await User.deleteOne({
//         email: req.params.id
//     });
//     if (!User) return res.status(404).send('The User with the given ID was not found.');
//     res.send(user);
// });

// router.get('/:id', async (req, res) => {
//     try {
//         const user = await User.find({
//             email: req.params.id
//         });

//         db(user);
//         res.send(user);
//     } catch (error) {
//         return res.status(404).send(error.message);
//     }
// });

module.exports = router;