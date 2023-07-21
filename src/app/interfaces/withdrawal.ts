export interface Withdrawal {
    id: number;
    sellerId: number;
    requestDate: string;
    amount: number;
    paymentDate: string;
    status: string;
}
