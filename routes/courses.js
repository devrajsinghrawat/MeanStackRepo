const express = require('express');
const router = express.Router();

const morgan = require('morgan');    // HTTP request logger

const courses = [
    { id: 1, name: 'BlockChain' },
    { id: 2, name: 'BigdB' },
    { id: 3, name: 'IoT' }
]

const env = process.env.NODE_ENV;

if (env == 'development') router.use(morgan('tiny'));                // http://expressjs.com/en/resources/middleware/morgan.html

router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    // res.send(req.params.id);
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(`Course with id ${req.params.id} does not found`);

    res.send(course);
})

// Post Operation
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
    // Look up the course, If not exist then error 404
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(`Course with id ${req.params.id} does not found`);

    const result = validateCourse(req.body);

    if (result.error) return res.status(400).send(result.error);

    course.name = req.body.name;
    res.send(course);
})

// Delete Operation 
router.delete('/:id', (req, res) => {
    // Look up the course, If not exist then error 404
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(`Course with id ${req.params.id} does not found`);

    const index = courses.indexOf(course);
    courses.splice(course, index)

    res.send(course);
})

// router.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.params);
// })

// router.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.query);
// })

module.exports = router;