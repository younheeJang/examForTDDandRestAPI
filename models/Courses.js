const mongoose = require('mongoose')
const Schema = mongoose.Schema

//define collection and schema for Course
let Courses = new Schema({
    course_name: {
        type: String
    },
    course_price: {
        type: Number
    }
}, {
    collection: 'courses'
})

module.exports = mongoose.model('Courses', Courses)