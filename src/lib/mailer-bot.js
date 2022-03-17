const MailerBot = require('./MailerBot')
const config = require('./config')

const mailerBot = new MailerBot({
    host: config.MAIL_HOST,
    secure: config.MAIL_SECURE,
    auth: {
        user: config.MAIL_AUTH_USER,
        pass: config.MAIL_AUTH_PASS,
    },
    to: config.MAIL_TO,
})

module.exports = mailerBot
