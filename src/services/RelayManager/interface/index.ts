import { IEVMAccount } from "../../Account";

export interface IRelayManager {
    getActiveRelayer(): IEVMAccount;
    increasePendingCount(address: string): void;
    decreasePendingCount(address: string): void;
}