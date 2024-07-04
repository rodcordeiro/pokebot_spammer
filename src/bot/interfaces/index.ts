export interface iBot {
    login(props:BotProps.Authentication):Promise<void>,
    openPage(options: BotProps.Channel & { subpage?: boolean }):Promise<void>,
    spamming(props:BotProps.SpammingProps):Promise<void>,
    booster(props:BotProps.BoosterProps):Promise<void>,
    changePoke(props:BotProps.ChangePokeProps):Promise<void>,
    addMarket(props:BotProps.AddMarketProps):Promise<void>
    removeMarket(props:BotProps.RemoveMarketProps):Promise<void>
}

export namespace BotProps{
    export interface Authentication {
        user: string,
        password: string,
        mfa?: string
    }

    export interface Channel {
        channel_url:string,
        input_label:string,
        browser_language: 'en'|'pt'
    }

    
    export interface SpammingProps {
        // action: 'spamming',
        levels:number,
        multipages?:boolean
    }
    
    export interface ChangePokeProps {
        // action: 'change_poke',
        pokemon_id:number
    }
    
    export interface BoosterProps{
        // action: 'booster',
        booster_level: number
    }
    
    export interface AddMarketProps {
        // action: 'add_market',
        range_start:number,       
        range_end:number,       
        market_value:number
    }

    export interface RemoveMarketProps {
        // action:  'remove_market'
        range_start:number,       
        range_end:number,       
    }
}