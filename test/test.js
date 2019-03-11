'use strict';

const chai = require('chai');
const expect = require('chai').expect;
const assert = require('assert')
const app = require('../server.js')
const Courses = require('../models/Courses')


//testing on just db and server's interation 
describe('api endpoint /courses', () => {

    //one inserted and res could expected to hage property 'course_name'
    it('insert one', () => {
        let newCourse = new Courses({ 'course_name': 'korean', 'course_price': 20000 });
        newCourse.save().then((res) => {
            console.log(res)
            expect(res).to.have.property('course_name')
        }).catch((err) => { console.log(err) })
    })

    //find all and res could be returned as array type not null!
    it('find all', () => {
        Courses.find()
            .then((res) => {
                console.log(res.length)
                expect(res).to.be.a('array')
            }).catch((err) => { console.log(err) })
    })

    //get empty null cause there is no course, 'mimic'
    it('find one', () => {
        Courses.findOne({ course_name: 'mimic' }).then((res) => {
            console.log(res)
            expect(res).to.be.a('null')
        }).catch((err) => { console.log(err) })
    })

    //update one course and value 'nModified' in res could be expected to 1
    it('update one', () => {
        Courses.update({ 'course_name': 'korean' }, { $set: { 'course_name': 'korean', 'course_price': 190000 } })
            .then((res) => {
                console.log(res)
                expect(res.nModified).to.equal(1)
            })
            .catch((err) => { res.status(500).send(err) })
    })


    //delete one course and value deletedCount in res could be expected to 1
    it('delete one', () => {
        Courses.deleteOne({ 'course_name': 'korean' })
            .then((res) => {
                console.log(res)
                expect(res.deletedCount).to.equal(1)
            }).catch((err) => {
                { res.status(500).send(err) }
            })
    })
})