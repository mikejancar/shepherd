const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 10,
    defaultViewport: {
      height: 1000,
      width: 1000
    },
    args: [
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process'
    ]
  });

  try {
    const page = await browser.newPage();
    await page.goto('https://moviesanywhere.com/login');

    await page.click('#login_form_email');
    await page.keyboard.type('mikejancar@gmail.com');
    await page.click('#login_form_password');
    await page.keyboard.type('!jmMov12906');

    const recaptchaFrame = await page.$('iframe');
    const frame = await recaptchaFrame.contentFrame();
    const recaptchaBox = await frame.$('#recaptcha-anchor');
    await recaptchaBox.click();
    await page.waitForTimeout(1000);
    // script fails here due to recaptcha image modal popping up
    await page.click('button[type="submit"]');

    const response = await page.waitForResponse('https://moviesanywhere.com/login');
    if (response) {
      console.log('response received');
      const body = await response.json();
      console.log(`token: ${body.token}`);
    } else {
      console.log('no response received');
      await page.screenshot({
        path: 'movies-anywhere-screen'
      });
    }
  } catch (error) {
    console.error(error);
  }
  await browser.close();
})();
