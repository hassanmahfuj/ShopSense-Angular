import { OrderDetails } from "./order-details";

export interface Order {
    id?: number;
    orderDate: string;
    customerId: number;
    subTotal: number;
    discount: number;
    tax: number;
    gatewayFee: number;
    shippingCharge: number;
    orderTotal: number;
    shippingStreet: string;
    shippingCity: string
    shippingPostCode: string;
    shippingState: string 
    shippingCountry: string;
    status: string;
    paymentStatus: string;
    paymentMethod: string;
    cardNumber: string;
    cardCvv: string;
    cardHolderName: string;
    cardExpiryDate: string;
    orderDetails: OrderDetails[];
}
