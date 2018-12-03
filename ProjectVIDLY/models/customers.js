const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
    },
    phone: {
        type: Number,
        required: true,
        minlength: 10,
        unique: true
    },
    isGold: {
        type: Boolean,
        default: false
    }
}));

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(3).max(10).required(),
        phone: Joi.number().min(10).required(),
        isGold: Joi.boolean()
    };

    return Joi.validate(customer, schema);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;