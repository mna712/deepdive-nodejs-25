const express = require('express');
const router = express.Router();
const { body } = require('../.gitignore/node_modules/express-validator/lib/index.js');
const controllers  = require('././controller.js'); // import controllers from controller.js


//get all courses

// route (resourse)                   //controller
router.route('/courses')

.get(controllers.getAllCourses)

//create new course

.post(   
    [
        body('title')
        .notEmpty()
        .withMessage('title can not be empty')
        .isLength({min:2})
        ,

        body('price')
        .notEmpty()
        .withMessage('price can not be empty')
    
    ]

, controllers.createCourse)




router.route('courses/:id')


//get course by id

.get(controllers.getCourseById)



//update course by id locally

.patch(
    [
        body('title')
        .notEmpty()
        .withMessage('title can not be empty')
        .isLength({min:2})
        ,
        body('price')
        .notEmpty()
        .withMessage('price can not be empty')
    ]
    , controllers.updateCourse)



 //delete course by id 

.delete(controllers.deleteCourse);



module.exports = router;