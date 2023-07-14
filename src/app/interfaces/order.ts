import { OrderDetails } from "./order-details";

export interface Order {
    id?: number;
    orderDate: string;
    orderTotal: number;
    customerId: number;
    discount: number;
    shippingCharge: number;
    tax: number;
    shippingStreet: string;
    shippingCity: string
    shippingPostCode: string;
    shippingState: string 
    shippingCountry: string;
    status: string;
    subTotal: number;
    paymentStatus: string;
    paymentMethod: string;
    cardNumber: string;
    cardCvv: string;
    cardHolderName: string;
    cardExpiryDate: string;
    orderDetails: OrderDetails[];
}
