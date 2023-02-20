export interface ICacheService {

    initialize(): Promise<void>;
    set(key: string, value: any): Promise<void>;
    get(key: string): Promise<any>;
    
}