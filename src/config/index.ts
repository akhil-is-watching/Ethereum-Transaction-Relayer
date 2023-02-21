import dotenv from 'dotenv'
dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 8000;
const REDIS_URL = process.env.REDIS_URL || '';


const RELAYER_MNEMONIC = process.env.RELAYER_MNEMONIC || '';
const RELAYER_COUNT = process.env.RELAYER_COUNT || 10;

const CHAIN_ID = Number(process.env.CHAIN_ID) || 8001;
const GAS_LIMIT = process.env.GAS_LIMIT || '';

const config = {
    rpc: {},
    server: {
        port: SERVER_PORT,
        redis_url: REDIS_URL
    },
    relayer: {
        relayer_mnemonic: RELAYER_MNEMONIC,
        relayer_count: RELAYER_COUNT,
        chain_id: CHAIN_ID,
        gasLimit: GAS_LIMIT
    }
}

export default config;