declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      readonly DISCORD_EMAIL: string;
      readonly DISCORD_PASSWORD: string;
      readonly DISCORD_MFA: string;
    }
  }
}

export {};
