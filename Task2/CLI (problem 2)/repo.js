#!/usr/bin/env node

import { Command } from "commander";
const command = new Command();
import inquirer from "inquirer";
import fs from "fs";
import fetch from "node-fetch";

command
  .name("github-cli")
  .description("Get repositories of a GitHub user and save them to a file")
  .version("1.0.0");
  
command
  .command("search")
  .alias("s")
  .description("get repositories of a GitHub user using username")
  .action(() => {
    inquirer
      .prompt([
        { type: "input", name: "username", message: "Enter GitHub username:" }
      ])
      .then((answers) => {
        const username = answers.username;
        if (!username) {
          console.log("Please enter a username.");
          return;
        }
        const url = `https://api.github.com/users/${username}/repos`;
        fetch(url)
          .then(res => res.json())
          .then(data => {
        
          let repoNames = [];
          for (let i = 0; i < data.length; i++) {
               repoNames.push(data[i].name);
               }

         let fileContent = repoNames.join("\n");

        fs.writeFileSync(username + "_repos.txt", fileContent);
        console.log("Repositories saved to " + username + "_repos.txt");
          })
          .catch(err => {
            console.log("Error:", err);
          });
      });
  });

command.parse(process.argv);