const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

// Automatically parse incoming JSON
app.use(express.json())

// Add user
app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

// Get users
app.get('/users', (req, res) => {
    User.find({ /* Empty object */ }).then((users) => {
        res.send(users)
    }).catch((error) => {
        res.status(500).send()
    })
})

// Get user by ID
app.get('/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id).then((user) => {
        if(!user) {
            return res.status(404).send()
        }

        res.send(user)
    }).catch((error) => {
        res.status(500).send()
    })
})

// Add Task
app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

// Get tasks
app.get('/tasks', (req, res) => {
    Task.find({ /* Empty object */}).then((tasks) => {
        res.send(tasks)
    }).catch((error) => {
        res.status(500).send
    })
})

// Get task by ID
app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id

    Task.findById(_id).then((task) => {
        if(!task) {
            return res.status(404).send()
        }

        return res.send(task)
    }).catch((error) => {
        return res.status(500).send
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})