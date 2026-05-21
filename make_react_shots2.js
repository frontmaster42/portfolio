const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  
  const pages = [
    { url: 'file:///home/z/my-project/portfolio/react-saas/index.html', name: 'react-saas' },
    { url: 'file:///home/z/my-project/portfolio/react-portfolio/index.html', name: 'react-dev-portfolio' },
  ];

  for (const p of pages) {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    await page.goto(p.url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: `/home/z/my-project/download/portfolio-kwork/${p.name}-full.png`,
      fullPage: true,
    });
    const coverImg = await page.screenshot({ clip: { x: 0, y: 0, width: 1920, height: 1280 } });
    require('fs').writeFileSync(`/home/z/my-project/download/portfolio-kwork/${p.name}-cover.png`, coverImg);
    console.log(`Done: ${p.name}`);
    await context.close();
  }

  await browser.close();
  console.log('All done!');
})();
