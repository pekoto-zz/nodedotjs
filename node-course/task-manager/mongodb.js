// Basic CRUD operations

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

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

    // Figure out which collection to insert document into
    db.collection('users').insertOne({
        name: 'Graham',
        age: 27
    })
})