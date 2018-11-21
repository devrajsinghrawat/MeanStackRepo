const express = require('express');
const Joi = require('joi');

const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'BlockChain' },
    { id: 2, name: 'BigdB' },
    { id: 3, name: 'IoT' }
]
app.get('/', (req, res) => {
    res.send('hello world');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    // res.send(req.params.id);
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(`Course with id ${req.params.id} does not found`);

    res.send(course);
})

// Post Operation
app.post('/api/courses', (req, res) => {
    const result = validateCourse(req.body);

    if (result.error) return res.status(400).send(result.error);

    const course = {
        id: (courses.length + 1),
        name: req.body.name
    }

    courses.push(course);
    res.send(course);
})

// Update Operation
app.put('/api/courses/:id', (req, res) => {
    // Look up the course, If not exist then error 404
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(`Course with id ${req.params.id} does not found`);

    const result = validateCourse(req.body);

    if (result.error) return res.status(400).send(result.error);

    course.name = req.body.name;
    res.send(course);
})

// Delete Operation 
app.delete('/api/courses/:id', (req, res) => {
    // Look up the course, If not exist then error 404
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(`Course with id ${req.params.id} does not found`);

    const index = courses.indexOf(course);
    courses.splice(course, index)

    res.send(course);
})

// app.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.params);
// })

// app.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.query);
// })

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Port ${port} is listening .......`));

function validateCourse(course) {

    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema);
}