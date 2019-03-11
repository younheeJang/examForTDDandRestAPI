const express = require('express')
const app = express()

const router = express.Router()

const Courses = require('../models/Courses')

//promise 개념 활용할 거예윰. async await는 나즁에 또르륵...

router.route('/')
    .post((req, res) => {
        console.log(req.body)
        const course = new Courses(req.body)
        course.save()
            .then(course => {
                res.status(201).send(course)
            }).catch(err => {
                console.log(err)
                res.status(500).send(err)
            })
    })


.get((req, res) => {
    if (req.query.coursename) {
        let course_name = req.query.coursename

        console.log(course_name);

        Courses.findOne({ 'course_name': course_name })
            .then((course) => res.status(200).json(course))
            .catch((err) => res.status(500).send(err))

    } else {
        Courses.find(function(err, courses) {
            if (err) {
                console.log(err);
            } else {
                console.log(courses);
                res.json(courses);
            }
        });
    }

})


router.put('/', (req, res) => {
    console.log(req.body.course_price)
    Courses.update({ 'course_name': req.body.course_name }, { $set: { 'course_name': req.body.course_name, 'course_price': req.body.course_price } })
        .then((WriteResult) => {
            console.log(WriteResult.nModified)
                //응답이가... 수정된 도큐로 안오고, 쿼리 이후 상태를 나타내는 객체가 와요https://docs.mongodb.com/manual/reference/method/WriteResult/#WriteResult.nModified
            res.status(200).send(WriteResult)
        })
        .catch((err) => { res.status(500).send(err) })

})

router.delete('/', (req, res) => {
    Courses.deleteOne({ 'course_name': req.body.course_name })
        .then((WriteResult) => {
            console.log(WriteResult)
            res.status(200).send(WriteResult)
        }).catch((err) => {
            { res.status(500).send(err) }
        })
})

module.exports = router