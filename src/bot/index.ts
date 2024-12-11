import puppeteer, { Browser, Page } from 'puppeteer';
import { BotProps, iBot } from './interfaces';
import { sleep } from './utils';
import { SPAMMING_MESSAGE } from './contansts';

export class Bot implements iBot {
  private _client: Browser| undefined;
  private _page: Page|undefined;
  private _lang: BotProps.Channel['browser_language'] | undefined;
  private _input_label: BotProps.Channel['input_label'] | undefined;


  async launch() {
    const browser = await puppeteer.launch({
      // headless: true,
      // args: ['--no-sandbox'
    });
    this._client = browser;
  }

  async openPage(options: BotProps.Channel) {
    const page = await this._client?.newPage();
    this._page = page;
    this._lang = options.browser_language || 'pt';
    this._input_label = options.input_label;
    await this._page?.goto(options.channel_url);
  }
  
  async login(options: BotProps.Authentication) {
    
    const email_input = await this._page?.waitForSelector(
      "input[name='email']",
      {
        timeout: 30000,
      },
    );

    await email_input?.type(options.user);
    const pwd_input = await this._page?.waitForSelector(
      "input[name='password']",
    );
    
    await pwd_input?.type(options.password);
    await this._page?.keyboard.press('Enter');

    if (options.mfa) {
      const mfa_input = await this._page?.waitForSelector(
        'input[autocomplete="one-time-code"]',
      );
      await mfa_input?.type(options.mfa);
      await this._page?.keyboard.press('Enter');
    }
    sleep(10000);
  }

  async spamming(props: BotProps.SpammingProps): Promise<void> {
    const input = await this.enterInput();
    const total_messages = new Array(props.levels * 68).fill(SPAMMING_MESSAGE);

    let i = 0;
    for await (const msg of total_messages) {
      i++;
      await input?.type(msg);
      await this._page?.keyboard.press('Enter');
      console.log(
        `${Math.round((i / total_messages.length) * 100)}% - ${i}/${total_messages.length} mensagens enviadas`,
      );
    }
  }

  async booster(props: BotProps.BoosterProps): Promise<void> {
    const input = await this.enterInput();
    await input?.type(`<@716390085896962058> buy XP Booster ${props.booster_level}`);
    await this._page?.keyboard.press('Enter');
  }

  async changePoke(props: BotProps.ChangePokeProps): Promise<void> {
    const input = await this.enterInput();
    input?.type(`<@716390085896962058> s ${props.pokemon_id}`);
    await this._page?.keyboard.press('Enter');
  }
  
  addMarket(props: BotProps.AddMarketProps): Promise<void> {
    throw new Error('Method not implemented.');
  }
  
  removeMarket(props: BotProps.RemoveMarketProps): Promise<void> {
    throw new Error('Method not implemented.');
  }

  private async enterInput(){
    const input = await this._page?.waitForSelector(
      `div[aria-label='${this._input_label}']`,
      {
        timeout: 120000,
      },
    );
    input?.click();
    return input;
  }
}
