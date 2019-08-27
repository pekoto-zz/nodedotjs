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