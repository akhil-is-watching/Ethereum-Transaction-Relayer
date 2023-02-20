import ethers, { BigNumber } from "ethers";
import { EIP1559Transaction, IEVMAccount } from "../Account";
import { INetworkService } from "./interface";

export class NetworkService implements INetworkService {

    private provider: ethers.providers.JsonRpcProvider;


    constructor(providerUrl: string) {
        this.provider = new ethers.providers.JsonRpcProvider(providerUrl);
    }


    async getEIP1559GasPrice(): Promise<any> {
        const feeData = await this.provider.getFeeData();
        const maxFeePerGas = feeData.maxFeePerGas && ethers.utils.hexValue(feeData.maxFeePerGas);
        const maxPriorityFeePerGas = feeData.maxPriorityFeePerGas && ethers.utils.hexValue(feeData.maxPriorityFeePerGas);
        return {
            maxFeePerGas,
            maxPriorityFeePerGas
        };
    }

    async getBalance(address: string): Promise<BigNumber> {
        const balance = await this.provider.getBalance(address);
        return balance;
    }

    async getTransactionReceipt(
        transactionHash: string
    ): Promise<ethers.providers.TransactionReceipt> {
        const transactionReceipt = await this.provider.getTransactionReceipt(transactionHash);
        return transactionReceipt;
    }

    async getNonce(address: string, pendingNonce = true): Promise<number> {
        const nonce = await this.provider.getTransactionCount(address, "pending");
        return nonce;
    }
    
    async sendTransaction(
        rawTransactionData: EIP1559Transaction,
        account: IEVMAccount
    ): Promise<ethers.providers.TransactionResponse> {
        const rawTx = rawTransactionData;
        rawTx.from = account.getPublicAddress();
        const tx = await account.signTransaction(rawTx);
        const receipt = await this.provider.sendTransaction(tx);
        return receipt;
    }
}