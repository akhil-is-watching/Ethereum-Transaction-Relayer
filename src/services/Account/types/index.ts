export type EIP1559Transaction = {
    to?: string,
    from?: string,
    nonce?: number,

    gasLimit?: string,
    gasPrice?: string,

    data?: string,
    value?: string,
    chainId?: number

    type?: number;
    maxPriorityFeePerGas?: string;
    maxFeePerGas?: string;
}