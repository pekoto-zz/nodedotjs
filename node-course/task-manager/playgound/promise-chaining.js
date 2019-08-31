require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('5d667263ad662b062b0c97e2', { age: 28 }).then((user) => {
//     console.log(user)
//     // Chain in next async call
//     return User.countDocuments({ age: 28 })
// }).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age: age })
    const count = await User.countDocuments( {age: age} )

    return count
}

updateAgeAndCount('5d667263ad662b062b0c97e2', 30).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})