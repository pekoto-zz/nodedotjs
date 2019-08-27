// Basic CRUD operations

// Destructuring
// Equivalent to:
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    // Callback that runs after connection is complete
    if (error) {
        console.log('Unable to connect to database!')
        return
    }

    // Get reference to database
    const db = client.db(databaseName)

    // db.collection('users').deleteMany({
    //     age: 27
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    db.collection('tasks').deleteOne({
        description: 'Task One'
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})