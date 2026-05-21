const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 790, height: 440 }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  await page.goto('file:///home/z/my-project/download/kwork-cover-react.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/home/z/my-project/download/portfolio-kwork/react-kwork-cover.png', clip: { x: 0, y: 0, width: 790, height: 440 } });
  console.log('Cover done!');
  await browser.close();
})();
