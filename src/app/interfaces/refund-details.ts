export interface RefundDetails {
    refundId: number;
    orderId: number;
    orderDetailsId: number;
    sellerId: number;
    reason: string;
    bankNumber: string;
    bankName: string;
    amount: number;
    status: string;
}
