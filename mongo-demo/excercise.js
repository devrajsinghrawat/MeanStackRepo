const db = require('debug')('app:db');
const mongoose = require('mongoose');

// Get instance of our Db Instance 
mongoose.connect('mongodb://localhost/mongo-excercise', {
    useNewUrlParser: true
});

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255,
        // match: /^Dev/
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'blockchain', 'backend']
    },
    author: String,
    tags: [String],
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean,
    price: {
        type: Number,
        function () {
            return this.isPublished;
        }
    }
});

const MyModel = mongoose.model('courses', courseSchema);

async function getCourses() {
    return await MyModel.find({
            isPublished: true,
        })
        .or([{
            price: {
                $gte: 15
            }
        }, {
            name: /.*By.*/i
        }])

        // .or([{
        //     tags: 'frontend'
        // }, {
        //     tags: 'backend'
        // }])
        .sort('-price')
        .select('name author price')
    // .sort({
    //     name: 1
    // })
    // .select({
    //     name: 1,
    //     author: 1
    // })
    //.count();
    db(results);
}

async function updateCourse(id) {
    // const course = await MyModel.findById(_id);
    try {
        const result = await MyModel.updateOne({
            name: "React Course"
        }, {
            $set: {
                price: 100
            }
        });
        db(result);
    } catch (error) {
        console.log(error.message);
    }
}

updateCourse('5a68fde3f09ad7646ddec17e');
// .then(result => db(result))
// getCourses()
//     .then(results => db(results))