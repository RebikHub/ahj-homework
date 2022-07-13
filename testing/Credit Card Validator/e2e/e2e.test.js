import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(10000); // default puppeteer timeout

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 250,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  describe('crad validator form', () => {
    test('should add valid', async () => {
      await page.goto(baseUrl);
      const form = await page.$('form');
      const input = await form.$('input');
      await input.type('2201011112147392');
      const submit = await form.$('button');
      submit.click();
      await page.waitForSelector('.valid');
    });
    test('should add not-valid', async () => {
      await page.goto(baseUrl);
      const form = await page.$('form');
      const input = await form.$('input');
      await input.type('777777777777');
      const submit = await form.$('button');
      submit.click();
      await page.waitForSelector('.not-valid');
    });
  });
});
