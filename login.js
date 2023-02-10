const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  const cookiePath = 'cookies.json'
  const cookiePath2 = 'cookies_backup.json'
  const waiteTime = 60000 // 60s

  function saveCookies(obj, savePath) {
    const str = JSON.stringify(obj, null, 2);
    fs.writeFileSync(savePath, str)
  }

  const browser = await puppeteer.launch({
    headless: false,
    devtools: true,
    ignoreDefaultArgs: ["--enable-automation"],
  });
  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => false,
    });
  })
  await page.setViewport({ width: 1200, height: 800 })
  await page.goto('https://juejin.cn/');
  // 等待输入 自己手动登录
  await page.waitForTimeout(waiteTime)
  // 登录成功后刷新页面并保存cookie
  await page.reload()
  await page.waitForTimeout(1000)
  let cookies = await page.cookies();
  console.log(cookies);
  saveCookies(cookies, cookiePath)
  saveCookies(cookies, cookiePath2)
  console.log(`cookie 已保存: ${cookiePath}`)
  console.log(`cookie 已备份: ${cookiePath2}`)
  await browser.close();
})();
