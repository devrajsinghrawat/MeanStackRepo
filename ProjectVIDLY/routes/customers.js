const db = require('debug')('app:db');

const express = require('express');
const router = express.Router();

const {
    Customer,
    validate
} = require('../models/customers');

router.get('/', async (req, res) => {
    res.send(await Customer.find().sort('name'));
});

router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        let customer = new Customer({
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        })
        await customer.save();
        db(customer);
        res.send(customer);
    } catch (error) {
        res.status(400).send(error.message);
        db(error.message);
    }
});

router.put('/:id', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const customer = await Customer.updateOne({
            phone: req.params.id
        }, {
            $set: {
                name: req.body.name,
                number: req.body.number,
                isGold: req.body.isGold
            }
        });
        res.send(customer);
    } catch (error) {
        db(error.message);
        return res.status(404).send(error.message);
    }
});

router.delete('/:id', async (req, res) => {
    const customer = await Customer.deleteOne({
        phone: req.params.id
    });
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    res.send(customer);
});

router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.find({
            phone: req.params.id
        });

        db(customer);
        res.send(customer);
    } catch (error) {
        return res.status(404).send(error.message);
    }
});

module.exports = router;