import ethers from "ethers";
import { IEVMAccount } from "./interface";
import { EIP1559Transaction } from "./types";

export class EMVAccount implements IEVMAccount {

    private signer: ethers.Wallet;
    private address: string;


    constructor(privateKey: string) {
        this.signer = new ethers.Wallet(privateKey);
        this.address = this.signer.address;
    }

    getPublicAddress(): string {
        return this.address;
    }

    signTransaction(transactionRequest: EIP1559Transaction): Promise<string> {
        return this.signer.signTransaction(transactionRequest);
    }

    signMessage(message: string): Promise<string> {
        return this.signer.signMessage(message);
    }
}