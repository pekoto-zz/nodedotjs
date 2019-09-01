const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'graham20@gmail.com',
        subject: 'Thanks for joining my node.js site!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'graham20@gmail.com',
        subject: 'Your account has been cancelled',
        text: 'Sorry to see you go. Come back soon!'
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}