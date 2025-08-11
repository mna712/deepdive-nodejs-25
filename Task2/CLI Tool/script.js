#!/usr/bin/env node

import { program } from "commander";
import inquirer from "inquirer";
import fs from "fs"; 
const filePath = "./course.json"; 
const questions=[
        {
          type: "input",
          name: "title",
          message: "please enter course title :",
        },
    
        {
            type: "input",
            name: "price",
            message: "please enter course price :",
       },
      ]
  
      
program
  .name("my-courses")
  .description("A CLI tool to manage your courses")
  .version("1.0.0");


program
  .command("add")
  .alias("a")
  .description("Add a new course")
  .action(() => {
    inquirer
      .prompt(questions)
      .then((answers) => {
        if (fs.existsSync(filePath)) {
          let existingData = [];
          try {
            existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          } catch (err) {
            console.error("Error reading file:", err);
            process.exit();
          }
          existingData.push(answers);
          fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
        } else {
          fs.writeFileSync(filePath, JSON.stringify([answers], null, 2));
        }
        console.log("Course added successfully!");
        console.log(`Title: ${answers.title}`);
        console.log(`Price: ${answers.price}`);
      });
  });



program.command('list')
.alias('ls')
.description('List all courses')
.action(() => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            process.exit();
        }
        try {
            const courses = JSON.parse(data);
            if (courses.length === 0) {
                console.log("No courses found.");
            } else {
                console.table(courses);
            }
        } catch (parseErr) {
            console.error("Error parsing JSON:", parseErr);
        }
    });
});
program.parse(process.argv);
