// //request from client , server recieves it and proceess the req 
// // and return response 

// const http = require('http');
// const server = http.createServer((req, res) => {
//     if(req.url === '/') {
//         res.write(); // This writes HTML response to the client
//     }
//     else if(req.url === '/about') {
//         res.write('About Page');
//     }
//     else
//     { 
//         res.statusCode = 404; // Set the status code to 404 for not found
//         statusCode = 
//         res.write('Page Not Found'); // Write a response for not found page
//     } 
//     res.end(); // This sends a response back to the client
// })



// server.listen(5000, () => {
//     console.log('Server is running on port 5000');
// });

// // nodemon is used to automatically restart the server when changes are made to the code
// // to run the server use command "npm start" or "nodemon index.js"




// //express is a web framework for Node.js that simplifies the process of building web applications
// //it provides a set of features and utilities to handle routing, middleware, and request/response   

// const express = require('express');
// const app = express();
// app.get('/', (req, res) => {
//     res.send('hii'); // This sends HTML response to the client
// });
// app.listen(5001, () => {
//     console.log('Server is running on port 5001');
// });
