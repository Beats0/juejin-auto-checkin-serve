const request = require('./request')
const { getCookieString } = require("./utils");

module.exports = function () {
  return {
    /**
     * 获取沾喜气中奖列表
     * @returns Promise<any>
     */
    get_dip_lucky_list: function () {
      return request({
        method: 'POST',
        url: 'https://api.juejin.cn/growth_api/v1/lottery_history/global_big',
        headers: {
          cookie: getCookieString()
        },
        data: { page_no: 1, page_size: 5 }
      })
    },

    /**
     * 沾喜气
     * @param {string | number} id
     * @returns Promise<any>
     */
    dip_lucky: function (id) {
      return request({
        method: 'POST',
        url: 'https://api.juejin.cn/growth_api/v1/lottery_lucky/dip_lucky',
        headers: {
          cookie: getCookieString()
        },
        data: { lottery_history_id: id }
      })
    }
  }
}
