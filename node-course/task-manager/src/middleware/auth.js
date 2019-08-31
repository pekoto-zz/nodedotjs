const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log('Token: ' + token)
        const decoded = jwt.verify(token, 'thisisthenodejscourse')
        console.log('Decoded: '+ decoded)

        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token /* look for this token in user array */ })
        

        if (!user) {
            throw new Error()   // Go to catch -- unauthenticated
        }
        
        req.user = user
        next()
    } catch (e) {
        console.log(e)
        res.status(401).send({ error: 'Please authenticate' })
    }
}

module.exports = auth