// Basic CRUD operations

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

// Destructuring
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

    // db.collection('users').findOne({ _id: new ObjectID('5d6240ff45aa5e056af3a6d2') }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }3

    //     console.log(user)
    // })
    
    // db.collection('users').find({ age: 27 }).toArray( (error, users) => {
    //     console.log(users)
    // })

    db.collection('tasks').find({completed: false}).toArray((error, tasks) => {
        console.log(tasks)
    })

})