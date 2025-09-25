import Echo from 'laravel-echo';
import Env from './env';
import Pusher from 'pusher-js';
import {LOGIN_URL} from "@/lib/apiEndpoints";

// Define Global Types For Pusher

declare global {
    interface Window {
        Pusher: typeof Pusher;
        Echo: typeof Echo;
    }
}

window.Pusher = Pusher;

// @ts-ignore
export const pvtLaraEco = (token:string) => new Echo({
    broadcaster: 'reverb',
    encrypted:false,
    authEnabled: Env.API_URL + "/api/broadcasting/auth",
    auth:{
        headers:{
            Authorization: `Bearer ${token}`
        }
    },
    key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
    wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
    wsPort: process.env.NEXT_PUBLIC_REVERB_PORT ?? 80,
    wssPort: process.env.NEXT_PUBLIC_REVERB_PORT ?? 443,
    forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
});

// @ts-ignore
export const laraEco = new Echo({
    broadcaster: 'reverb',
    encrypted:false,
    key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
    wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
    wsPort: process.env.NEXT_PUBLIC_REVERB_PORT ?? 80,
    wssPort: process.env.NEXT_PUBLIC_REVERB_PORT ?? 443,
    forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
});