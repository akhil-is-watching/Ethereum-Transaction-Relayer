import config from "../../config";
import { EIP1559Transaction } from "../Account";
import { INetworkService } from "../NetworkService";
import { INonceManager } from "../NonceManager";
import { IRelayManager } from "../RelayManager";


export class TransactionService {
    

    relayManager: IRelayManager;
    networkService: INetworkService;
    nonceManager: INonceManager;



    async createTransaction(transaction: EIP1559Transaction) {
        const account = this.relayManager.getActiveRelayer();
        const from = account.getPublicAddress();
        const nonce = await this.nonceManager.getLatestNonce(from);
        const { maxFeePerGas, maxPriorityFeePerGas } = await this.networkService.getEIP1559GasPrice();
        transaction = {
            ...transaction,
            from, 
            nonce,
            gasLimit: config.relayer.gasLimit,
            value: '0x', 
            maxFeePerGas, 
            maxPriorityFeePerGas, 
            type: 2, 
            chainId: config.relayer.chain_id
        };
        return {transaction, account};
    }

    async executeTransaction(transactionRequest: EIP1559Transaction) {
        const {transaction, account} = await this.createTransaction(transactionRequest);
        const receipt = await this.networkService.sendTransaction(transaction, account);
    }
}