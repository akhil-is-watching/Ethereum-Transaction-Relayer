import dotenv from 'dotenv'
dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 8000;

const REDIS_URL = process.env.REDIS_URL || '';

const config = {
    rpc: {},
    server: {
        port: SERVER_PORT
    },
    relayer: {
        redis_url: REDIS_URL
    }
}

export default config;