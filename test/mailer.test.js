const MailerBot = require('../src/lib/MailerBot')

const bot = new MailerBot({
  host: '', // smtp.163.com
  secure: true,
  auth: {
    user: '',
    pass: '',
  },
  to: '',
})

bot.sendMessage('测试消息')
