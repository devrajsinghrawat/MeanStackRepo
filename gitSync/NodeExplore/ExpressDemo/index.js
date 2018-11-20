const express = require('express');

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
    const validate = courses.find(c => c.id === parseInt(req.params.id));
    if (!validate) res.status(404).send(`Course with id ${req.params.id} does not found`);
    res.send(validate);
})


app.post('/api/courses', (req, res) => {
    const course = {
        id = courses.length + 1,
        name = req.body.name
    }

    courses.push(course);
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
