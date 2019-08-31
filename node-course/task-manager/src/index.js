const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//     if (req.method == 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Site under maintenance')
// })

// Automatically parse incoming JSON
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const jwt = require('jsonwebtoken')

const myFunction = async () => {
    // A.B.C
    // A: base64 encoded meta info (e.g., this is a JWT token)
    // B: payload, base64 encoded string of data we provided
    // C: signature, used to verify the token
    const token = jwt.sign({ _id:'abc123' /* unique val to identify user */}, 'thisisthejwtsecret' /* secret to sign token */, { expiresIn: '7 days'}) // Returns new token
    console.log(token)

    // get the decrypted token data
    const data = jwt.verify(token, 'thisisthejwtsecret')
    console.log(data)
}

myFunction()