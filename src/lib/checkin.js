const fs = require('fs');
const path = require('path')
const puppeteer = require('puppeteer');
const message = require("./message");

async function checkin() {
  const cookieJson = require('../../cookies.json')
  const cookiePath = path.join(__dirname, '../../cookies.json')

  function saveCookies(obj) {
    const str = JSON.stringify(obj, null, 2);
    fs.writeFileSync(cookiePath, str)
  }

  const browser = await puppeteer.launch({
    headless: false,
    devtools: true,
    ignoreDefaultArgs: ["--enable-automation"]});
  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => false,
    });
  })
  await page.setViewport({ width: 1440, height: 800 })
  for (let i = 0; i < cookieJson.length; i++) {
    const c = cookieJson[i]
    await page.setCookie(c);
  }
  await page.waitForTimeout(2000)
  await page.goto('https://juejin.cn/');
  await page.waitForTimeout(2000)

  // 读3篇文章
  let links = await page.$$eval('li.item a.title', els => els.map(el => el.href))
  links = links.slice(0, 3)
  for (let i = 0; i < links.length; i++) {
    const l = links[i]
    await page.goto(l)
    await page.waitForTimeout(2000)
    await autoScroll(page)
    console.log(`read ${i} ${l}`)
  }

  async function autoScroll(page) {
    await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
        let totalHeight = 0;
        let distance = 100;
        let scrollMax = 10000
        let timer = setInterval(() => {
          let scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight || totalHeight >= scrollMax) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });
  }

  // 签到
  await page.goto('https://juejin.cn/user/center/signin?from=sign_in_menu_bar')
  await page.waitForTimeout(2000)
  const signinBtn = await page.$('.signin.btn');
  if(signinBtn) {
    signinBtn.click()
    message('签到成功...')
  } else {
    const signedinBtn = await page.$('.signedin.btn');
    !!signedinBtn && signedinBtn.click()
  }
  await page.waitForTimeout(2000)
  // 提示抽奖
  const cjBtn = await page.$('.btn-area .btn');
  !!cjBtn && cjBtn.click()
  // 自动跳转到抽奖页
  await page.waitForNavigation()
  await page.waitForTimeout(2000)
  // 免费抽奖
  await page.waitForSelector(`#turntable-item-0`);
  await page.$eval('#turntable-item-0', el => {
    el.click()
  })
  await page.waitForTimeout(4000)
  const lotteryBtn = await page.$('.lottery_modal .button.submit');
  !!lotteryBtn && lotteryBtn.click()
  await page.waitForTimeout(2000)
  // 收集bug
  await page.goto('https://juejin.cn/user/center/bugfix?enter_from=bugFix_bar')
  await page.waitForTimeout(3000)
  await page.$eval('.game-wrap .item-container', el => {
    let els = el.querySelectorAll('.item.bug-item-web')
    els.forEach(elItem => {
      elItem.click()
    })
  })

  await page.waitForTimeout(1000)
  // 保存cookie
  let cookies = await page.cookies();
  saveCookies(cookies)
  await page.waitForTimeout(1000)

  await browser.close();
}

module.exports = {
  checkin
}
