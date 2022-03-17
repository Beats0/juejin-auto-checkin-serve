const WXWorkNotify = require('../src/lib/WXWorkNotify.js')

WXWorkNotify({
  id: '',               // 企业 ID
  agentId: '',          // 应用 ID
  secret: '',           // 应用 secret
  msgData: {
    msgtype: "text",
    text: {
      content: '测试消息'       // 消息
    }
  }
}).then(res => {
  console.log('WXWorkNotify bot result:', res)
})
