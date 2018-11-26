const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db')

const config = require('config');
const express = require('express');
const Joi = require('joi');
const helmet = require('helmet');    // 3rd party middleware

const logger = require('./middleware/logger');
const homeRouter = require('./routes/default');
const coursesRouter = require('./routes/courses');

const app = express();
app.use('/', homeRouter);
app.use('/api/courses', coursesRouter);

const env = process.env.NODE_ENV;
startupDebugger(`Enviornment: ${env}`);

app.use(helmet());
dbDebugger(`Application name: ${config.get('name')}`);
dbDebugger(`Mail Server: ${config.get('mail.host')}`);
dbDebugger(`Mail Server Password: ${config.get('mail.password')}`);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // app.use(express.static('./'));
app.use('/api/bicourses/:id', logger);  // http://expressjs.com/en/guide/using-middleware.html


const port = process.env.PORT || 3001;
app.listen(port, () => startupDebugger(`Port ${port} is listening .......`));

function validateCourse(course) {

    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema);
}

//sudo sysctl fs.inotify.max_user_watches=582222 && sudo sysctl -p
//https://stackoverflow.com/questions/34662574/node-js-getting-error-nodemon-internal-watch-failed-watch-enospc/34664097