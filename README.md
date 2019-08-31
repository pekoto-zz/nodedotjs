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

### Callbacks with error handling

Generally the callback will return both an error and data, and then returned undefined for one or the other based on the API call result.

````
const getWeather = (longitude, latitude, callback) => {
    url = 'https://api.darksky.net/forecast/3544672e2d5906402eea3ffd902a8c95/' + longitude + ',' + latitude + '?units=si&lang=ja'

    request( {url:url, json:true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (response.body.error) {
            callback('Unable to find weather for specified longitude/latitude', undefined)
        } else {
            callback(undefined, {
                summary: response.body.daily.data[0].summary,
                currentTemp: response.body.currently.temperature
            })
        }
    })
}

getWeather(35.6762,139.6503, (error, data) => {
    console.log('Summary: ' + data.summary)
    console.log('Temp: ' + data.currentTemp)
})

````

## Property Syntax Shorthand

Class variables with the same name as a previously delcared variable will be automatically assigned.

````
// Name will be assigned to 'Graham'
const name = 'Graham'
const userAge = 27
 
const user = {
   name,
   age: userAge,
   location: 'Tokyo'
}

````

## Object destructuring

Object properties can be automatically assigned to variables.

````
const product = {
   label: 'Red notebook',
   price: 3,
   stock: 201,
   salePrice: undefined
}
 
const {label:productLabel, stock, rating = 5 /*Default IFF no product value in object*/ } = product
 
//console.log(productLabel)
//console.log(stock)
//console.log(rating)
 
// Destructuring within a function
 
const transaction = (type, {label, stock}) => {
   console.log(type, label, stock)
}
 
transaction('order', product)

````

## Path variables

````
console.log(__dirname)    // absolute path to directory
console.log(__filename)    // absolute path to file
````

These are needed if you need to reference some static file in your solution.

Use ````path.join(__dirname, ‘../public’)```` to go up a level, out of src, and into the public directory to get a static file.

## ES6 Default Parameters

Just use `=` after the parameter name.

````
Just use an = after the parameter name.

const greeter = (name='Anon', age) => {
   console.log('Hello ' + name)
}
 
// Hello Graham
greeter('Graham')
 
// Hello Anon
greeter()
````

## Promises

An alternative to callbacks.
A promise uses `resolve` or `reject` instead of ordering parameters to decide what to do if a function succeeds or fails.
The caller then uses the `then()` and `catch()` blocks to decide what to do if you can a resolve or reject.


````
// Callback
const doWorkCallback = (callback) => {
    setTimeout(() => {
        // callback('This is my error!', undefined)
        callback(undefined, [1, 4, 7])
    }, 2000)
}

doWorkCallback((error, result) => {
    if (error) {
        return console.log(error)
    }

    console.log(result)
})

// Promise
const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // Success
        //resolve([7, 4, 1])
        // Failure
        reject('Things went wrong!')
    }, 2000);
})

doWorkPromise.then((result) => {
    // then() lets us specify a function to run when
    // things go well. This will not run when doWorkPromise
    // returns reject.
    console.log('Success!', result)
}).catch((error) => {
    // Catch lets us speficy what to do if there was an error
    console.log('Error!', error)
})

//
//                        fulfilled (succeeded)
//                       /
// Promise -- pending --> 
//                       \
//                        rejected (failed)
//
````
### Promise chaining

By returning a new promise, it will be called after the first promise ends. The catch block will catch errors from either of the promises.

````
User.findByIdAndUpdate('5d667263ad662b062b0c97e2', { age: 28 }).then((user) => {
    console.log(user)
    // Chain in next async call
    return User.countDocuments({ age: 28 })
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(e)
})
````

### Async/Await

A way to make it easier to work with promises.
Use 'async' to mark the function as async
async functions will ALWAYS return a promise (e.g., Promise {return val})
So you can call it like 
````
func().then((result) => {
      ...
}).catch((error) => {
      ...
})
````

Throw an error to reject the promise
````
throw new Error('Something went wrong...')
````

When working with async/await, you don't have to change your Promise functions. Just how you work with them.

````
const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            if (a < 0 || b < 0) {
                return reject('Numbers must be >= 0')
            }

            resolve(a + b)
        }, 2000)
    })
}
````

Using await we can call like a normal function.
It also lets you have all the variables in the same scope.

````

const doWork = async () => {
    const sum = await add(1, 99)
    const sum2 = await add(sum, 50)
    const sum3 = await add(sum2, -3)
    return sum3
}

doWork().then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})

````

## Bcrpyt hashing

````
Setup: 

[Cient] password --> 
[DB] hashedpassword+salt

Retrieval:

[Client] password -->
[DB] Extract salt --> hash password with stored salt --> check if matches DB password 

````

## JWTs

JWTs have the following 3 components, separated by .s: A.B.C:

* A: base64 encoded meta info (e.g., this is a JWT token)
* B: payload, base64 encoded string of data we provided
* C: signature, used to verify the token

We can sign a token like this:
````
    const token = jwt.sign({ _id:'abc123' /* unique val to identify user */}, 'thisisthejwtsecret' /* secret to sign token */, { expiresIn: '7 days'}) // Returns new token
````
(Give it an ID and expiration.)

The tokens are sent in the request header:

````
Key: Authorization
Value: Bearer [TOKEN]
````

When we want to decrypt the token to verify the user, we can do it like this:

````
const data = jwt.verify(token, 'thisisthejwtsecret')

````

This will give us the ID back out.
