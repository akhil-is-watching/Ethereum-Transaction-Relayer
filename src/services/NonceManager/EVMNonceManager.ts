import { ICacheService } from "../CacheService";
import { INetworkService } from "../NetworkService";
import { INonceManager } from "./interface";



export class EVMNonceManager implements INonceManager {

    private cacheService: ICacheService;
    private networkService: INetworkService;

    constructor(cacheService: ICacheService, networkService: INetworkService) {
        this.cacheService = cacheService;
        this.networkService = networkService;
    }

    async getLatestNonce(address:string): Promise<number> {
        let accNonceKey = this.getAccountNonceKey(address);
        let cacheNonce = await this.cacheService.get(accNonceKey);
        let accUsedNonceKey = this.getUsedAccountNonceKey(address, cacheNonce);
        if(await this.cacheService.get(accUsedNonceKey) == true) {
            const nonce = await this.setLatestNonceFromNetwork(address);
            return nonce;
        }
        return cacheNonce;
    }

    async incrementNonce(address: string): Promise<void> {
        let accNonceKey = this.getAccountNonceKey(address);
        let currentNonce = await this.cacheService.get(accNonceKey)
        await this.cacheService.set(address, currentNonce+1);
    }

    async setUsedNonce(address: string, nonce: number): Promise<void> {
        let accNonceKey = this.getUsedAccountNonceKey(address, nonce);
        await this.cacheService.set(accNonceKey, true);

    }

    async setLatestNonceFromNetwork(address: string): Promise<number> {
        let accNonceKey = this.getAccountNonceKey(address);
        let networkNonce = await this.networkService.getNonce(address);
        await this.cacheService.set(accNonceKey, networkNonce);
        return networkNonce;
    }

    private getAccountNonceKey(address: string): string {
        return `${address}_nonce`;
    }

    private getUsedAccountNonceKey(address: string, nonce: number): string {
        return `${address}_nonce_${nonce}`;
    }
}