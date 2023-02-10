const path = require('path')

require('dotenv').config({ path: path.join(__dirname, '../../.env') })

module.exports = {
  // 自动玩游戏需要此参数，在掘金首页打开控制台输入这行代码`window.__NUXT__.state.auth.user.id`就可以得到
  USERID: process.env.USERID || '',
  DINGTALK_WEBHOOK: process.env.DINGTALK_WEBHOOK || '',
  DINGTALK_SECRET: process.env.DINGTALK_SECRET || '',
  // ALL_IN: process.env.ALL_IN || '',
  WX_COMPANY_ID: process.env.WX_COMPANY_ID || '', // 企业 ID
  WX_APP_ID: process.env.WX_APP_ID || '', // 应用 ID
  WX_APP_SECRET: process.env.WX_APP_SECRET || '', // 应用 secret
  FEISHU_WEBHOOK: process.env.FEISHU_WEBHOOK || '',
  FEISHU_SECRET: process.env.FEISHU_SECRET || '',
  MAIL_HOST: process.env.MAIL_HOST || '',
  MAIL_SECURE: process.env.MAIL_SECURE === 'true',
  MAIL_AUTH_USER: process.env.MAIL_AUTH_USER || '',
  MAIL_AUTH_PASS: process.env.MAIL_AUTH_PASS || '',
  MAIL_TO: process.env.MAIL_TO || '',
  TASK_TIME: process.env.TASK_TIME || '',
  IS_RANDOM_TIME: process.env.IS_RANDOM_TIME === 'true' ,
}
