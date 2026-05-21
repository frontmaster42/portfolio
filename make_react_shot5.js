const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  await page.goto('file:///home/z/my-project/portfolio/react-taskmanager/index.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: '/home/z/my-project/download/portfolio-kwork/react-taskmanager-full.png',
    fullPage: true,
  });
  const coverImg = await page.screenshot({ clip: { x: 0, y: 0, width: 1920, height: 1280 } });
  require('fs').writeFileSync('/home/z/my-project/download/portfolio-kwork/react-taskmanager-cover.png', coverImg);
  console.log('Done!');
  await context.close();
  await browser.close();
})();
