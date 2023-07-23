export interface Seller {
    id: number;
    name: string;
    storeName: string;
    officeAddress: string;
    email: string;
    password: string;
    role: string;
    balance: number;
    holderName?: string;
    accountNumber?: string;
    bankName?: string;
    branchName?: string;
    status?: string;
}
