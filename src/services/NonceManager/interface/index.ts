export interface INonceManager {
    getLatestNonce(address:string): Promise<number>;
    incrementNonce(address: string): Promise<void>;
    setUsedNonce(address: string, nonce: number): Promise<void>;
    setLatestNonceFromNetwork(address: string): Promise<number>;
}