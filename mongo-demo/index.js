const mongoose = require('mongoose');
const db = require('debug')('app:db');

mongoose.connect('mongodb://localhost/myDB', {
        useNewUrlParser: true
    })
    .then(() => db('Connected to dB....'))
    .catch(err => db('Error in Connection....', err))

const courseSchema = new mongoose.Schema({
    name: String,
    price: Number,
    author: String,
    tags: [String],
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'C Course',
        price: 30,
        author: 'Raj',
        tags: ['EC', 'BTC', 'Solidity'],
        isPublished: true
    })

    const result = await course.save();
    db(result);
}

async function getCourse() {
    const result = await Course
        .find()
        .and([{
                    price: {
                        $gte: 10,
                        $lte: 40
                    }
                },
                {
                    author: /raj$/i
                }
            ]

        )
        .sort({
            name: -1
        })
        // .limit(2)
        .select({
            author: 1,
            price: 1,
        });
    // .count()
    // Start with Dev or End with Singh ( adding i makes it case in sensitive)
    // or Dev any where
    // .or([{
    //     author: /^Dev/
    // }, {
    //     author: /Singh$/i
    // }, {
    //     author: /.*Dev.*/ //i
    // }])
    // .or([{
    //     author: 'Dev'
    // }, {
    //     isPublished: true
    // }])
    // .find({
    //     author: 'Dev',
    //     isPublished: true
    // })
    //     .limit(2)
    //     .sort({
    //         name: 1
    //     })
    //     .select({
    //         name: 1,
    //         tags: 1
    //     });

    db(result);
}

getCourse();
// createCourse();