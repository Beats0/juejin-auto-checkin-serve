const bot = require('./dingtalk-bot')
const WXWorkNotify = require('./WXWorkNotify-bot.js')
const feishuBot = require('./feishu-bot')
const mailerBot = require('./mailer-bot')

module.exports = function message(msg) {
  console.log(msg)
  bot.sendMessage(msg)
  feishuBot.sendMessage(msg)
  mailerBot.sendMessage(msg)
  WXWorkNotify(msg)
}
