//make simple api
const express= require('express');
const { title } = require('process');
const app = express();
app.use(express.json()); // to parse JSON bodies //body parser middleware
const{body, validationResult} = require('express-validator');

let{courses} = require('././data.js'); // import courses from data.js


// let courses =[{
//     id:1,
//     title: 'Node.js',
//     price: 200
// }
// ,{
//     id:2,
//     title: 'react', 
//     price: 100
// }
// ];


//get all courses

// route                     //controller
app.get('/api/courses',(req,res)=>
{
    res.json(courses);
})

//get course by id

app.get('/api/courses/:id',(req,res)=>
{
     const cid = +req.params.id; //  params is an object that contains the route parameters
     //=>  + converts string to number
     const course = courses.find(c => c.id === cid);
    if(!course) return res.status(404).json({msg: 'Course not found'});
     res.json(course); 
}
)

//create new course

app.post('/api/courses',
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
,(req,res)=>
    {

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
    res.statusCode(201).json()

     
})  


//update course by id locally

app.patch('/api/courses/:id',
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
    ,(req,res)=>
{  
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
 })


 //delete course by id 

app.delete('/api/courses/:id',(req,res)=>
{
    const cid = +req.params.id;
    courses = courses.filter(c => c.id !== cid); 
    
    res.status(200).json(courses); 

})


app.listen(3000,()=>
{
    console.log('listening on port 3000')
})

