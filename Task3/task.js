const express = require('express');
const fs = require('fs');
const http = require('http');

const students = JSON.parse(fs.readFileSync("./data.json", 'utf8'));

function average(grades) {
    return grades.reduce((a, b) => a + b, 0) / grades.length;
}

const app = express();

app.get('/students', (req, res) => {
    res.json(students);
});

app.get('/students/active', (req, res) => {
    res.json(students.filter(s => s.status =="active"));
});

app.get('/students/inactive', (req, res) => {
    res.json(students.filter(s => s.status=="inactive"));
});
app.get('/students/top', (req, res) => {
    res.json(students.reduce((a, b) => average(b.grades) > average(a.grades) ? b : a));
});

app.get('/students/fail', (req, res) => {
    res.json(students.filter(s => average(s.grades) < 60));
});

const server = http.createServer(app);

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});



