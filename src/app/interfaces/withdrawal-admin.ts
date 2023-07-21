export interface WithdrawalAdmin {
    id: number;
    sellerId: number;
    storeName: string;
    holderName: string;
    accountNumber: string;
    bankName: string;
    branchName: string;
    requestDate: string;
    amount: number;
    paymentDate: string;
    status: string;
}
