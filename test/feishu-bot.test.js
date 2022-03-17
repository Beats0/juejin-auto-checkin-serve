const FeishuBot = require('../src/lib/FeishuBot')

const bot = new FeishuBot({
  webhook: '', // 请填写自己机器人的Webhook地址
  secret: '', // 请填写自己机器人加签的secret
})

bot.sendMessage('测试消息')
