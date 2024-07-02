import puppeteer, { Browser, Page } from 'puppeteer';
/**
 * Delay for a number of milliseconds
 */
function sleep(delay: number) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}
export class Bot {
  private _client: Browser;
  private _page: Page;

  private message =
    'iwej dfhqqoihn ekj rqeeopjdiwqjeqwdb ewjhbe wihweiub ewkrjeqiruiqnwe qe qwrioiqje woijdwuii dhqww e woiwej dfhqqoihn ekj rqeeopjdiwqjeqwdb ewjhbe wihweiub ewkrjeqiruiqnwe qe qwrioiqje woijdwuii dhqww e woiwej dfhqqoihn ekj rqeeopjdiwqjeqwdb ewjhbe wihweiub ewkrjeqiruiqnwe qe qwrioiqje woijdwuii dhqww e woiwej dfhqqoihn ekj rqeeopjdiwqjeqwdb ewjhbe wihweiub ewkrjeqiruiqnwe qe qwrioiqje woijdwuii dhqww e woiwej dfhqqoihn ekj rqeeopjdiwqjeqwdb ewjhbe wihweiub ewkrjeqiruiqnwe qe qwrioiqje woijdwuii dhqww e woiwej dfhqqoihn ekj rqeeopjdiwqjeqwdb ewjhbe wihweiub ewkrjeqiruiqnwe qe qwrioiqje woijdwuii dhqww e woiwej dfhqqoihn ekj rqeeopjdiwqjeqwdb ewjhbe wihweiub ewkrjeqiruiqnwe qe qwrioiqje woijdwuii dhqww e woiwej dfhqqoihn ekj rqeeopjdiwqjeqwdb ewjhbe wihweiub ewkrjeqiruiqnwe qe qwrioiqje woijdwuii dhqww e woiwej dfhqqoihn ekj rqeeopjdiwqjeqwdb ewjhbe wihweiub ewkrjeqiruiqnwe qe qwrioiqje woijdwuii dhqww e woiwej dfhqqoihn ekj rqeeopjdiwqjeqwdb ewjhbe wihweiub ewkrjeqiruiqnwe qe qwrioiqje woijdwuii dhqww e woiwej dfhqqoihn ekj rqeeopjdiwqjeqwdb ewjhbe wihweiub ewkrjeqiruiqnwe qe qwrioiqje woijdwuii dhqww e woiwej dfhqqoihn ekj rqeeopjdiwqjeqwdb ewjhbe wihweiub ewkrjeqiruiqnwe qe qwrioiqje woijdwuii dhqww e woiwej dfhqqoihn ekj rqeeopjdiwqjeqwdb ewjhbe wihweiub ewkrjeqiruiqnwe qe qwrioiqje woijdwuii dhqww e woiwej dfhqqoihn ekj rqeeopjdiwqjeqwdb ewjhbe wihweiub ewkrjeqiruiqnwe qe qwrioiqje woijdwuii dhqww e woiwej dfhqqoihn ekj rqeeopjdiwqjeqwdb ewjhbe wihweiub ewkrjeqiruiqnwe qe qwrioiqje woijdwuii dhqww e woiwej dfhqqoihn ekj rqeeopjdiwqjeqwdb ewjhbe wihweiub ewkrjeqiruiqnwe qe qwrioiqje woijdwuii dhqww e woiwej dfhqqoihn ekj rqeeopjdiwqjeqwdb ewjhbe wihweiub ewkrjeqiruiqnwe qe qwrioiqje woijdwuii dhqww e woiwej dfhqqoihn ekj rqeeopjdiwqjeqwdb ewjhbe wihweiub ewkrjeqiruiqnwe qe qwrioiqje woijdwuii dhqww e woiwej dfhqqoihn ekj rqeeopjdiwqjeqwdb ewjhbe wihweiub ewkrjeqiruiqnwe qe qwrioiqje woijdwuii dhqww e woiwej dfhqqoihn ekj rqeeopjdiwqjeqwdb ewjhdhqww e woiwej llllll';
  private input_label: string;
  private authorize_button_labe: string;
  private default_channel =
    'https://discord.com/channels/911248622421704704/925735083313348618';

  constructor({ lang = 'en' }: { lang: 'en' | 'pt' }) {
    this.input_label =
      lang == 'en' ? 'Message #spammar' : 'Conversar em #spammar';
    this.authorize_button_labe = lang == 'en' ? 'Authorize' : 'Autorizar';
  }

  async launch() {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    this._client = browser;
    this._page = page;
  }

  async login() {
    await this._page.goto(this.default_channel);
    const email_input = await this._page.waitForSelector(
      "input[name='email']",
      {
        timeout: 30000,
      },
    );

    await email_input?.type(process.env.DISCORD_EMAIL as string);
    const pwd_input = await this._page.waitForSelector(
      "input[name='password']",
    );
    await pwd_input?.type(process.env.DISCORD_PASSWORD as string);
    await this._page.keyboard.press('Enter');

    if (process.env.DISCORD_MFA) {
      const mfa_input = await this._page.waitForSelector(
        'input[autocomplete="one-time-code"]',
      );
      await mfa_input?.type(process.env.DISCORD_MFA);
      await this._page.keyboard.press('Enter');
    }

    sleep(10000);
    await this._page.goto(this.default_channel);
  }
  async spam(levels: number) {
    const input = await this._page.waitForSelector(
      `div[aria-label='${this.input_label}']`,
      {
        timeout: 120000,
      },
    );
    input?.click();
    const total_messages = new Array(levels * 68).fill(this.message);

    let i = 0;
    for await (const msg of total_messages) {
      i++;
      await input?.type(msg);
      await this._page.keyboard.press('Enter');
      console.log(
        `${Math.round((i / total_messages.length) * 100)}% - ${i}/${total_messages.length} mensagens enviadas`,
      );
    }
  }
}
