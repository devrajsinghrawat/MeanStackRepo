const Joi = require('joi');
const express = require('express');
const router = express.Router();
const {
    Genre,
    validate
} = require('../models/genres');

router.get('/', async (req, res) => {
    res.send(await Genre.find().sort('name'));
});

router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({
        name: req.body.name
    })
    await genre.save();
    res.send(genre);
});

router.put('/:id', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        // const genre = await Genre.findByIdAndUpdate(req.params.id, {  // Dep

        // const genre = await Genre.findOneAndUpdate(req.params.id, {   // Dep
        //     name: req.body.name
        // }, {
        //     new: true
        // });
        const genre = await Genre.updateOne({
            _id: req.params.id
        }, {
            $set: {
                name: req.body.name
            }
        });

        res.send(genre);
    } catch (error) {
        return res.status(404).send(error.message);
    }
});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.deleteOne({
        _id: req.params.id
    });
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
});

router.get('/:id', async (req, res) => {

    try {
        const genre = await Genre.find({
            _id: req.params.id
        });
        res.send(genre);
    } catch (error) {
        return res.status(404).send(error.message);
    }
});

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
}

module.exports = router;