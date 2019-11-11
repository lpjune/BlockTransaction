# Transaction Manager with Blockchain
### Mississippi State University, Software Engineering, Fall 2019
Uses Node.js, npm, Pug.js, Express, Mongoose, Bootstrap, and MongoDB

## Requirements

* [Node.js Download](https://nodejs.org/en/download/)
* [MongoDB Atlas Create Account](https://www.mongodb.com/cloud/atlas)
* [(Optional) GitKraken Download](https://www.gitkraken.com/download)

## Installing Node
1. Install to default location (program files)

## Checking Installations
1. Open terminal
2. Run `node -v` to check Node.js
3. Run `npm -v` to check npm

## MongoDB Set-up Steps
1. Verify you have a MongoDB Atlas account
2. Send me email you used to register so I can add you to the project
3. After you've been added, make sure the Context (in top left) is Software Engineering Lab
4. Under the clusters, click connect in the pos cluster
5. Select Connect Your Application
6. Leave driver as Node.js and version 3.0 or later
7. Copy the connection string and replace <password> (deleting brackets), with your password for this database, not MongoDB
8. At the end where it says test, replace that with Blockchain
9. Save this string for use in installation steps

## Installation Steps

1. Clone repo to your Users/username directory
2. Use terminal to cd to repo, or open a terminal in vscode
2. Run `npm install`
3. Create a `.env` file in the project root and add one line: DATABASE=yourstring (string from last section, no quotes)
5. Run `npm start`
6. Visit http://localhost:3000 to view

## Helpful Links
* [Guide to Node.js and npm](https://www.sitepoint.com/beginners-guide-node-package-manager/)
* [Guide to Pug.js](https://itnext.io/pug-js-to-make-your-life-easier-with-html-templates-9c62273626e0)
* [MongoDB with Node.js Driver](https://docs.mongodb.com/ecosystem/drivers/node/)
* [Bootstrap Documentation](https://getbootstrap.com/docs/4.3/getting-started/introduction/)

Note: If you branch please branch by feature or page not by your name. Discuss with group on GroupMe before commiting any changes to master, or starting work on a different feature (so we don't get merge conflicts or repeat work.) If you're not 100% with git/github, download GitKraken from the link at the top. It will visualize branches and commits for you.
