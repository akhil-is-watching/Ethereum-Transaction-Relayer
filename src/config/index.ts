import dotenv from 'dotenv'
dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 8000;

const config = {
    rpc: {},
    server: {
        port: SERVER_PORT
    },
    relayer: {}
}

export default config;