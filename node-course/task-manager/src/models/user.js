const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be > 0')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    tokens: [{
        // Note this is an array so users
        // can have tokens for mobile, desktop, etc.
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, { // Schema options
    timestamps: true
})

// Virtual property (not stored in DB, just used by Mongoose to show they're related)
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',   // Field in User object
    foreignField: 'owner'   // Field in Task object
})

// Instance methods

// Make sure we don't send back password or tokens
// after the user authenticates
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString()}, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({token})
    await user.save() // Make sure user saved to DB

    return token
}

// Static methods

// Custom method that can be called on the model
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email })

    if (!user) {
        throw new Error('Unable to log in')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to log in')
    }

    return user
}

// Hash plaintext passwords
// pre/post -- do something just before/after an event
userSchema.pre('save', async function (next) {
    const user = this   // Convenience var

    // True when pass created/updated
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    // Function is finished (no more async calls, etc.)
    next()
})

// Delete associated tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})

// Define model
const User = mongoose.model('User', userSchema)

module.exports = User