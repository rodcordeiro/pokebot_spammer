import 'dotenv/config';
import { Bot } from './bot';

const bot = new Bot({
  lang: 'en',
});

(async () => {
  await bot.launch();
  await bot.login();
  await bot.spam(81);
})();
