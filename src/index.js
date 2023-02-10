const schedule = require('node-schedule');
const { USERID, IS_RANDOM_TIME, TASK_TIME } = require('./lib/config')
const message = require('./lib/message')
const { checkin } = require('./lib/checkin')
const { autoGame } = require('./lib/game/autoGame')
const { getCookieString, sleep } = require("./lib/utils");

const COOKIE = getCookieString()
if (!COOKIE) return message('获取不到cookie，请检查设置')

const api = require('./lib/api')()

// 粘喜气
async function dipLucky() {
  const RANDOM_NUMBER = Math.floor(Math.random() * 5)
  const { lotteries } = await api.get_dip_lucky_list()
  const DIP_LUCKY_ID = lotteries?.[RANDOM_NUMBER]?.history_id ?? 0

  const { has_dip, dip_action, total_value } = await api.dip_lucky(DIP_LUCKY_ID)

  const BeamingValue = `当前喜气值: ${total_value}`

  if (has_dip) return `今日已沾过喜气, ${BeamingValue}`

  if (dip_action === 1) return `沾喜气成功! ${BeamingValue}`
}

console.log(`time: ${TASK_TIME}`)
// 定时任务
const scheduleTask = () => {
  schedule.scheduleJob(TASK_TIME, async () => {
    if (IS_RANDOM_TIME) {
      // [10-40]分钟内
      const st = Math.floor(Math.random() * 30) + 10
      message(`定时运行: ${ st }分钟后开始签到`)
      await sleep(st * 1000 * 60)
    }
    message('开始签到...')
    await checkin()
    message('签到成功...')
    const dipMsg = await dipLucky()
    message(dipMsg)
    if (!USERID) return message('获取不到uid，请检查设置')
    autoGame()
    message('游戏运行中...')
  })
}

scheduleTask()
