import {hideBin} from 'yargs/helpers';
import yargs from 'yargs';
import {EnvEnum} from "./env.enum";

export function getMode(): EnvEnum {
    const argv = yargs(hideBin(process.argv)).argv
    return argv['mode'] as EnvEnum || EnvEnum.Production;
}
export function corsedUrl(): string | string[] {
    const common = [
        "https://restorator.app",
        "http://restorator.app",
        "capacitor://restorator.app",
    ]
    switch (getMode()) {
        case EnvEnum.Dev:
            return "*"
        case EnvEnum.Staging:
            return [
                'https://r-stage.resto-club.com',
                'https://amr98-stage.resto-club.com',
                'https://a-stage.resto-club.com',
                'https://order-stage.resto-club.com',
                'https://stage.resto-club.com',
                'https://ws1-stage.resto-club.com',
                ...common
            ]
        case EnvEnum.Production:
            return [
                "https://restorator.restclick.vio.net.ua",
                "https://mgr.restclick.vio.net.ua",
                "https://owner.restclick.vio.net.ua",
                "https://customer.restclick.vio.net.ua",
                "https://amr98.resto-club.com",
                "https://a.resto-club.com",
                "https://r.resto-club.com",
                "https://order.resto-club.com",
                ...common
            ]
    }
}