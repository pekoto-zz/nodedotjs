// Use 'async' to mark the function as async
// async functions will ALWAYS return a promise (e.g., Promise {return val})
// So you can call it like 
//
// func().then((result) => {
//      ...
// }).catch((error) => {
//      ...
//})
//
// throw an error to reject the promise
// throw new Error('Something went wrong...')

// When working with async/await, you don't have to change
// your Promise functions. Just how you work with them.

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

// Using await we can call like a normal function
// It also lets you have all the variables in the same scope
// C.f., with promise chaining:
// add(1, 1).then((sum) => {
//     console.log(sum)
//     return add(sum, 4)
// }).then((sum2) => {
//     // Do this after add(sum, 4)
//     console.log(sum2)
// }).catch((error) => {
//     console.log(error)
// })
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