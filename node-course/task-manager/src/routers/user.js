const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')
const { sendWelcomeEmail, sendCancelEmail } = require('../emails/account')

// Add user
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }

    // C.f., non-await version
    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })
})

// Authenticate user
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

// Sign out the user
router.post('/users/logout', auth, async (req, res) => {
    try {
        // Get all of the tokens except the one
        // we want to remove
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()
        sendWelcomeEmail('graham20@gmail.com', user.name)
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// Sign out all devices
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// Get users own data
router.get('/users/me', auth, async (req, res) => { 
    // See auth middleware function (middleware/auth.js) to see
    // how we got the user based on the JWT value
    res.send(req.user)
})

// Update user
router.patch('/users/me', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update) )

    if (!isValidOperation) {
         return res.status(400).send({error: 'Invalid update!'})
    }

    try {
        // Set values of user to match the value of the user in the req
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()

        res.send(req.user)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

// Delete user
router.delete('/users/me', auth, async (req, res) => {
    
    try {    
        await req.user.remove()
        res.send(req.user)
        sendCancelEmail('graham20@gmail.com', req.user.name)
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

// multer destination directory
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb /* callback */) {
        if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
            cb(new Error('File must be an image'))
        }
        
        cb(undefined, true)    // upload was okay
    }
})

const errorMiddleware = (req, res, next) => {
    throw new Error('From my middleware')
}

// Add avatar
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

// Delete avatar
router.delete('/users/me/avatar', auth, async (req, res) => {
    try {
        req.user.avatar = undefined
        await req.user.save()
        res.send()
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

// Get image
router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()   // Jump to 404 catch
        }

        res.set('Content-Type', 'image/png') // Set header
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})

module.exports = router