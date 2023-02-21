import { IEVMAccount } from "../../Account"

export type AccountMapType = {
    [address: string]: {
        account: IEVMAccount;
        pendingTransactionCount: number;
    }
}