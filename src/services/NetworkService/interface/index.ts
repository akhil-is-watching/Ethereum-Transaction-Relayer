import ethers, { BigNumber } from "ethers"
import { EIP1559Transaction, IEVMAccount } from "../../Account";

export interface INetworkService {
    getEIP1559GasPrice(): Promise<any>;
    getBalance(address: string): Promise<BigNumber>;
    getTransactionReceipt(transactionHash: string): Promise<ethers.providers.TransactionReceipt>;
    getNonce(address: string): Promise<number>;
    sendTransaction(
        rawTransactionData: EIP1559Transaction,
        account: IEVMAccount
    ): Promise<ethers.providers.TransactionResponse>
}