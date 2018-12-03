const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
}));

function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).max(20).required(),
        email: Joi.string().max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    };
    return Joi.validate(user, schema);
}

// exports.User = userModel;
// exports.validate = validateUser;

module.exports = {
    User: User,
    validate: validateUser
}