import ethers from "ethers";
import config from "../../config";
import { EMVAccount, IEVMAccount } from "../Account";
import { IRelayManager } from "./interface";
import { AccountMapType } from "./types";

export class RelayManager implements IRelayManager {

    private relayers: AccountMapType


    constructor() {
        this.relayers = {};
        this.seedRelayers();
    }

    private seedRelayers() {
        const relayer_mnemonic = config.relayer.relayer_mnemonic;
        const node = ethers.utils.HDNode.fromMnemonic(relayer_mnemonic)

        for(let index=0; index<config.relayer.relayer_count; index++) {
            let path = `m/44'/60'/0'/0/${index}`;
            const priv_key = node.derivePath(path).privateKey
            const account = new EMVAccount(priv_key);
            this.relayers[account.getPublicAddress()] = { account: account, pendingTransactionCount: 0 }
        }

        console.log(`INFO:  RELAYERS SEEDED`);
    }

    getActiveRelayer(): IEVMAccount {
        let low_count = 10000000000000000;
        let low_index = ""

        for(let rKey in Object.keys(this.relayers)) {
            if(this.relayers[rKey].pendingTransactionCount < low_count) {
                low_count = this.relayers[rKey].pendingTransactionCount;
                low_index = rKey;
            } 
        }
        return this.relayers[low_index].account;
    }

    increasePendingCount(address: string): void {
        this.relayers[address].pendingTransactionCount++;
    }

    decreasePendingCount(address: string): void {
        this.relayers[address].pendingTransactionCount--;
    }

}