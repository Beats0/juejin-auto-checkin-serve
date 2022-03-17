const nodemailer = require('nodemailer');
const dayjs = require('dayjs')
const argv = require('minimist')(process.argv.slice(2));

class MailerBot {
  constructor(options = {}) {
    this.text = ''
    this.transporter = null
    this.options = options
    this.init(options)
  }

  init(options) {
    this.transporter = nodemailer.createTransport({
      host: options.host,//邮箱服务的主机，如smtp.163.com、smtp.qq.com
      //开启安全连接
      secure: options.secure,
      //用户信息
      auth: {
        user: options.auth.user,
        pass: options.auth.pass, // 这里是授权密码而不是邮件密码
      }
    });
  }

  send(text) {
    let p;
    // 没有这两个参数则静默失败
    if (!this.options.host || !this.options.hasOwnProperty('secure') || !this.options.auth.user || !this.options.auth.pass || !this.options.to) {
      p = Promise.resolve({
        errcode: -1,
        errmsg: 'mail host、secure、user、pass、to不能为空',
      })
    } else {
      // 收件信息
      const mailOptions = {
        from: this.options.auth.user,
        to: this.options.to,
        subject: '掘金签到',
        text,
      };
      p = this.transporter.sendMail(mailOptions).then(res => res)
    }
    return p
  }

  sendMessage(msg) {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
    this.text += `${dayjs().format('HH:mm:ss')} ${msg}\n`
    this.timer = setTimeout(() => {
      this.send(this.text).then((res) => {
        if(argv.mode === 'test') {
          console.log('MailerBot test result: ', res)
        }
        this.text = ''
      })
    }, 1000)
  }
}

module.exports = MailerBot
