const express = require('express')
const app = express()
app.use(express.static('public'));

const PORT = 3000
app.listen(PORT, function() {
    console.log('your server is running under port num : ' + PORT)
})


const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


const mongoose = require('mongoose')
const config = require('./db')
mongoose.connect(config.DB).then(
    () => { console.log('db is connected') },
    err => { console.log('cannot connect to db') }
)


const Courses = require('./models/Courses')
const CourseRoute = require('./routes/CourseRoute')
app.use('/courses', CourseRoute)