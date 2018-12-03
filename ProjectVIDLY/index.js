const nondb = require('debug')('app:nondb');

const genres = require('./routes/genres');
const users = require('./routes/users');
const customers = require('./routes/customers');
const auth = require('./routes/auth');

const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/genres', genres);
app.use('/api/users', users);
app.use('/api/customers', customers);
app.use('/api/auth', auth);

mongoose.connect('mongodb://localhost/vidly', {
        useNewUrlParser: true
    })
    .then(() => nondb('Connected to MongodB...'))
    .catch(err => nondb(err.message));

const port = process.env.PORT || 3000;
app.listen(port, () => nondb(`Listening on port ${port}...`));