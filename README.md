# Node.js
Node.js notes and examples based on the [Udemy course](https://www.udemy.com/the-complete-nodejs-developer-course-2/).

## Overview
Node.js is a JavaScript runtime. It was built so JavaScript can run outside of the browser.
It is build on the Chrome V8 engine.

V8 is written in C++. Node.js sends functions to V8; V8 returns the result.

````
Node.js  
         (JS code) ---> V8 (C++ function) 
         <--- (result)
      
E.g., fs.readFile() <> C++ function in V8

````

* Start: `node`
* Stop: `process.exit()` (process is an object)

## TMUX reminder

* Start session: `tmux`
* Basic shortcut: `ctrl+b`
* Vertical split: `%`
* Horitonzal split: `"`
* Swap panes: `o`
* Kill pane: `x`

## Modules

Module document can be found [here](https://nodejs.org/api/).

To import modules like this:

````
const fs = require('fs') // fs == module name
fs.writeFile...
````

To turn your own files into modules:

````
// utils.js
const name = 'Me'

module.exports = name // this is what is referenced when importing this module

````

````
// File 1
const name = require(./utils.js')

console.log(name)
````

To initialize your project directory to use npm (node package manager):

`npm init`

This creats a file `package.json` which manages dependencies.






````



