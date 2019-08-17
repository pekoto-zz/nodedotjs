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

## Modules

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

// To export multiple functions:
module.exports = {
    getNotes: getNotes,
    addNote: addNote
}

````

````
// File 1
const name = require(./utils.js')

console.log(name)
````

To initialize your project directory to use npm (node package manager):

`npm init`

This creates a file `package.json` which manages dependencies.

Packages can be found [here](https://www.npmjs.com).

### Global Packages

You can install packages globally by using `-g`.
Global packages can be run as a command instead of being imported into a certain app.

E.g., `nodemon` allows you just to change a file and have the changes picked up automatically, instead of having to rerun node.


## Command line arguments

Arguments can be accessed via `process.argv[n]`.

`yargs` is a common CL argument parser.

## JSON serialization

JSON serialization can be done as usual:

````
const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Hoiday'
}

const bookJSON = JSON.stringify(book)
console.log(bookJSON)

const parsedData = JSON.parse(bookJSON)
console.log(parsedData.author)  

````

## ES6 Arrow functions

ES6 = ECMA script = formal name for JavaScript.

````
// Long form
const square = (x) => {
    return x * x;
}

// Short form
const square = (x) => x*x;

// Class function (normally can't access this)
const event = {
    name: 'Birthday Party',
    guestList: ['Graham', 'Jen', 'Mike'],
    printGuestList() {
        console.log('Guest list for ' + this.name)

        this.guestList.forEach((guest) => {
            console.log(guest + ' is attending ' + this.name)
        })
    }
}

````

## Debugging

Add `debugger` command to set a breakpoint.
Then run node as `node inspect...` to break.

Pull up Chrome and go to `chrome://inspect` > Add folder to workspace.

After finishing, type `restart` while console is in debug to debug again.

## Async Models

````
setTimeout(() => {                  // Event
    console.log('Two seconds')      // Callback
}, 2000)

setTimeout(() => {                  // Event
    console.log('Zero seconds')      // Callback
}, 0)
````

Now, the __callback queue__ maintains a list of all of the functions to be executed.

When a given event fires:

1. The callback is added to the callback queue
2. The function moves from the callback queue to the call stack
3. The function executes

E.g., After 0 seconds, `console.log` is added to the callback queue, and then added to the call stack, and then executes.

Now, the callback queue will only be emptied when the callstack is empty. I.e., callbacks will be executed after synchronous functions finish.

````
Events --> Callback queue --> Call stack
````

## NPM request/error handling

````
request({ url:url, json:true }, (error, response) => {
    if (error) {
        console.log('Unable to connect to weather service')
    } else if (response.body.error) {
        // HTTP error code
        console.log('Unable to find location')
    } else {
        console.log(response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature)
    }
})
````

## Callbacks with return values

To make a function async, we take a callback in, and pass back the data you want to return into it.

````
const add = (a, b, callback) => {
    setTimeout(() => {
        callback(a+b)
    }, 2000)
}

add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
})
````

