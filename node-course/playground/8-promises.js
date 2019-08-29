// Promise chaning
const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}

// Embed promises -- can get confusing with number of layers
// add(1, 2).then((sum) => {
//     console.log(sum)

//     add(sum, 5).then((sum2) => {
//         console.log(sum2)
//     }).catch((error) => {
//         console.log(error)
//     })

// Promise chaining
add(1, 1).then((sum) => {
    console.log(sum)
    return add(sum, 4)
}).then((sum2) => {
    // Do this after add(sum, 4)
    console.log(sum2)
}).catch((error) => {
    console.log(error)
})

// }).catch((error) => {
//     console.log(error)
// })

// Callback
// const doWorkCallback = (callback) => {
//     setTimeout(() => {
//         // callback('This is my error!', undefined)
//         callback(undefined, [1, 4, 7])
//     }, 2000)
// }

// doWorkCallback((error, result) => {
//     if (error) {
//         return console.log(error)
//     }

//     console.log(result)
// })

// Promise
// const doWorkPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // Success
//         //resolve([7, 4, 1])
//         // Failure
//         reject('Things went wrong!')
//     }, 2000);
// })

// doWorkPromise.then((result) => {
//     // then() lets us specify a function to run when
//     // things go well. This will not run when doWorkPromise
//     // returns reject.
//     console.log('Success!', result)
// }).catch((error) => {
//     // Catch lets us speficy what to do if there was an error
//     console.log('Error!', error)
// })

//
//                        fulfilled (succeeded)
//                       /
// Promise -- pending --> 
//                       \
//                        rejected (failed)
//