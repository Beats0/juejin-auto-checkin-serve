const fs = require("fs");
const path = require('path')

module.exports = {
  assignOption(ops1, ops2) {
    let ops = Object.assign({}, ops1, ops2)
    let keys = Object.keys(ops1)
    keys.forEach((item) => {
      if (typeof ops1[item] === 'object' && !Array.isArray(ops1[item])) {
        ops[item] = Object.assign({}, ops1[item], ops2[item] || {})
      }
    })
    return ops
  },
  getCookieString() {
    const cookiePath = path.join(__dirname, '../../cookies.json')
    let c = fs.readFileSync(cookiePath,  {encoding:'utf8', flag:'r'})
    c = JSON.parse(c)
    let carr = []
    c.forEach(item => {
      carr.push(`${item.name}=${item.value}`)
    })
    let s = carr.join('; ')
    return s
  },
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  },
}
