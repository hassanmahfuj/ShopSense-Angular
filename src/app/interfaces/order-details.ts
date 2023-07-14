export interface OrderDetails {
    id?: number;
    orderId?: number;
    productId: number;
    sellerId: number;
    storeName: string;
    productName: string;
    productUnitPrice: number;
    productThumbnailUrl: string;
    status: string;
    quantity: number;
    subTotal: number;
    deliveryDate: string;
}
