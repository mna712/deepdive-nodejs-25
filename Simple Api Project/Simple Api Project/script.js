const express = require('express');
const app = express();

const courseRouter = require('./course/routes.js');
app.use('/', courseRouter); //  localhost/ 


app.listen(3000, () => {
    console.log('listening on port 3000');
});
