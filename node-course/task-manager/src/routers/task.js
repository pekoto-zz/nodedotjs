const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

// Add Task
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Get tasks
router.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({/* Empty body */})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

// Get task by ID
router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)

        if (!task) {
            return res.status(404).send()
        }

        return res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Update task
router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed', 'description'] 
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: 'Error: Invalid update field!'})
    }

    try {
        const task = await Task.findById(req.params.id)

        updates.forEach((update) => {
            task[update] = req.body[update]
        })
    
        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

// Delete task
router.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findByIdAndDelete(_id)

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router