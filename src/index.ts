import 'dotenv/config';
import { Bot } from './bot';

const bot = new Bot();

(async () => {
  await bot.launch();
  await bot.login({
    user: process.env.DISCORD_USER,
    password: process.env.DISCORD_PASSWORD,
    mfa: process.env.DISCORD_MFA,
  });
  await bot.openPage({
    browser_language: 'en',
    channel_url: 'https://discord.com/channels/911248622421704704/925735083313348618',
    input_label: 'Message #spammar',
  })
  await bot.booster({
    booster_level: 3
  })
await bot.spamming({
  levels: 13
})
})();
