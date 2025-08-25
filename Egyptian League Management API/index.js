const express = require('express');
const mongoose = require('mongoose');
const app = express();

// MongoDB connection
const url = "mongodb+srv://menna:db@dbluster0.0tbwdjy.mongodb.net/";
mongoose.connect(url)
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch(err => console.log('MongoDB connection error:', err));

// Middleware
app.use(express.json());

// Import routers
const TeamRouter = require('./routes/TeamRoutes.js');
const MatchRouter = require('./routes/MatchRoutes.js');

// Mount routers
app.use('/teams', TeamRouter);
app.use('/matches', MatchRouter);

// Global middleware for not found routes
app.use((req, res) => {
    res.status(404).json({ 
        status: "Error", 
        message: "Route not found" 
    });
});

// Global error handler
app.use((err, req, res, next) => {
    res.status(500).json({ 
        status: "Error", 
        message: err.message 
    });
});

// Start server
app.listen(5000, () => {
    console.log('Server listening on port 5000');
});