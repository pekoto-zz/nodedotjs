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

