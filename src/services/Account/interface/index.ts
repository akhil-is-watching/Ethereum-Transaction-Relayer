import { EIP1559Transaction } from "../types"

export interface IEVMAccount {
    getPublicAddress(): string
    signTransaction(transactionRequest: EIP1559Transaction): Promise<string>
    signMessage(message: string): Promise<string>
}