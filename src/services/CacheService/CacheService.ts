import redis from 'redis';
import config from '../../config';
import { ICacheService } from './interface';

export class CacheService implements ICacheService {

    private client: redis.RedisClientType;


    async initialize(): Promise<void> {
        this.client = redis.createClient({ url: config.relayer.redis_url });
        await this.client.connect();
    }


    async set(key: string, value: any): Promise<void> {
        await this.client.set(key, value);
    }

    async get(key: string): Promise<any> {
        return await this.client.get(key);
    }
}