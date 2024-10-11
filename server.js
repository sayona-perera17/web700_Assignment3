/*********************************************************************************
*  WEB700 – Assignment 3
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: SAYONA PERERA Student ID: 169835238 Date: 10/11/24
*
********************************************************************************/ 


const express = require('express');
const path = require('path');
const collegeData = require('./modules/collegeData');

const HTTP_PORT = process.env.PORT || 8080;
const app = express();

// Route for home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/home.html"));
});

// Route for about page
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "views/about.html"));
});

// Route for HTML demo
app.get("/htmlDemo", (req, res) => {
    res.sendFile(path.join(__dirname, "views/htmlDemo.html"));
});

// Route to get all students
app.get("/students", (req, res) => {
    const course = req.query.course;
    if (course) {
        collegeData.getStudentsByCourse(course).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({ message: "no results" });
        });
    } else {
        collegeData.getAllStudents().then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({ message: "no results" });
        });
    }
});

// Route to get a student by studentNum
app.get("/student/:num", (req, res) => {
    collegeData.getStudentByNum(req.params.num).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({ message: "no results" });
    });
});

// Route to get all courses
app.get("/courses", (req, res) => {
    collegeData.getCourses().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({ message: "no results" });
    });
});

// Route to handle non-existent routes (404)
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// Initialize and start server only if initialization is successful
collegeData.initialize().then(() => {
    app.listen(HTTP_PORT, () => {
        console.log("Server listening on port: " + HTTP_PORT);
    });
}).catch((err) => {
    console.log("Unable to start server: " + err);
});
