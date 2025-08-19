const  validationResult  = require('../.gitignore/node_modules/express-validator/lib/index.js');
let courses = require('../data.js'); // import data from data.js


const getAllCourses = (req, res) => {
    res.json(courses);
}


const getCourseById = (req, res) => {
    const cid = +req.params.id; //  params is an object that contains the route parameters
     //=>  + converts string to number
     const course = courses.find(c => c.id === cid);
    if(!course) return res.status(404).json({msg: 'Course not found'});
     res.json(course); 
}


const createCourse = (req, res) => {
   // if(!req.body.title || !req.body.price) {
      //     return res.status(400).json({msg: 'Title and price are required'});
      // }
      //express validator
  
      const errors=validationResult(req);
       if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});}
  
  
      // courses.push({
      //     id: courses.length + 1,
      //     title: req.body.title,
      //     price: req.body.price
  
      // });
  
      courses.push({ id: courses.length + 1, ...req.body });
      res.status(201).json()
  
}   



const updateCourse = (req, res) => {
   const cid = +req.params.id;
     let course = courses.find(c => c.id === cid);
     if(!course) return res.status(404).json({msg: 'Course not found'});
 
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
     }
 course={...course, ...req.body}; // spread operator to update the course
  
 res.status(200).json(course);
     res.json(course);
}   


const deleteCourse = (req, res) => {
 const cid = +req.params.id;
    courses = courses.filter(c => c.id !== cid); 
    
    res.status(200).json(courses); 
}


module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,   
    updateCourse,
    deleteCourse
}