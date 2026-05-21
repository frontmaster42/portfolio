const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  
  const pages = [
    { url: 'https://frontmaster42-portfolio.vercel.app/coffee-landing/', name: 'coffee-landing-hd', fullPage: true },
    { url: 'https://frontmaster42-portfolio.vercel.app/barbershop-landing/', name: 'barbershop-landing-hd', fullPage: true },
    { url: 'https://frontmaster42-portfolio.vercel.app/photographer-landing/', name: 'photographer-landing-hd', fullPage: true },
  ];

  for (const p of pages) {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    await page.goto(p.url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: `/home/z/my-project/download/portfolio-screenshots/${p.name}.png`,
      fullPage: p.fullPage,
    });
    console.log(`Done: ${p.name}`);
    await context.close();
  }

  await browser.close();
  console.log('All screenshots done!');
})();
