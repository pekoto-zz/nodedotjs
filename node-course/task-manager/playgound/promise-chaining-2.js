require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndRemove('5d69e7807dc2e0c03b4bc152').then((task) => {
//     console.log('Removed task: ' + task)
//     return Task.countDocuments({completed: false})
// }).then((result) => {
//         console.log(result)
// }).catch((error) => {
//         console.log(error)
// })

const findByIdAndRemove = async(id) => {
        const task = await Task.findByIdAndRemove(id)
        const count = await Task.countDocuments({completed: false})

        return count
}

findByIdAndRemove('5d6a00fd75b10565853e8e84').then((count) => {
        console.log('Removed task, ' + count + ' remain')
}).catch((error) => {
        console.log(error)
})