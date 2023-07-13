export interface CartItem {
    id?: number;
    customerId: number;
    productId: number;
    productName: string;
    productThumbnailUrl: string;
    productUnitPrice: number;
    productQuantity: number;
    subTotal: number;
}
