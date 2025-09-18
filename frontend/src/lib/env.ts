class Env {
    static API_URL = process.env.NEXT_PUBLIC_API_URL as string;
    static APP_URL = process.env.NEXT_PUBLIC_APP_URL as string;
}

export default Env;