import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Seller } from '../interfaces/seller';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { Order } from '../interfaces/order';
import { OrderDetails } from '../interfaces/order-details';
import { Withdrawal } from '../interfaces/withdrawal';
import { SellerStat } from '../interfaces/seller-stat';
import { ReportSales } from '../interfaces/report-sales';
import { AuthRequest } from '../interfaces/auth-request';
import { AuthResponse } from '../interfaces/auth-response';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  private baseUrl: string = 'http://localhost:8080/seller';

  categories: string[] = ["Watches", "Furniture", "Mobile", "Clothing", "Shoes"]

  constructor(private http: HttpClient) { }

  getSellerHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("seller-jwt")
    })
  }

  sellerLogin(seller: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.baseUrl.concat('/login'), seller);
  }

  sellerSignup(seller: Seller): Observable<Seller> {
    return this.http.post<Seller>(this.baseUrl.concat('/signup'), seller);
  }

  getSellerToken(): Seller {
    return JSON.parse(localStorage.getItem('seller-token') || '{}');
  }

  getSeller(): Observable<Seller> {
    return this.http.get<Seller>(this.baseUrl.concat('/') + this.getSellerToken().id, { headers: this.getSellerHeaders() });
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.baseUrl.concat('/product/') + id, { headers: this.getSellerHeaders() });
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl.concat('/products/') + this.getSellerToken().id, { headers: this.getSellerHeaders() });
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl.concat('/product'), product, { headers: this.getSellerHeaders() });
  }

  updateProduct(product: Product): Observable<boolean> {
    return this.http.put<boolean>(this.baseUrl.concat('/product'), product, { headers: this.getSellerHeaders() });
  }

  deleteProduct(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl.concat('/product/') + id, { headers: this.getSellerHeaders() });
  }

  getOrders(id: number): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl.concat('/orders'), {
      params: { "id": id },
      headers: this.getSellerHeaders()
    });
  }

  getOrder(orderId: number, sellerId: number): Observable<Order> {
    return this.http.get<Order>(this.baseUrl.concat('/order'), {
      params: { "orderid": orderId, "sellerid": sellerId },
      headers: this.getSellerHeaders()
    });
  }

  updateOrder(order: OrderDetails): Observable<boolean> {
    return this.http.put<boolean>(this.baseUrl.concat('/order'), order, { headers: this.getSellerHeaders() });
  }

  requestWithdraw(withdrawal: Withdrawal) {
    return this.http.post<Withdrawal>(this.baseUrl.concat('/withdraw'), withdrawal, { headers: this.getSellerHeaders() });
  }

  getWithdrawals() {
    return this.http.get<Withdrawal[]>(this.baseUrl.concat('/withdrawals/') + this.getSellerToken().id, { headers: this.getSellerHeaders() });
  }

  // get stat
  getStat(): Observable<SellerStat> {
    return this.http.get<SellerStat>(this.baseUrl.concat('/stat?sellerId=') + this.getSellerToken().id, { headers: this.getSellerHeaders() });
  }

  getSalesReport(startDate: string, endDate: string): Observable<ReportSales[]> {
    return this.http.get<ReportSales[]>(this.baseUrl.concat('/report/sales'), {
      params: {
        sellerId: this.getSellerToken().id,
        startDate,
        endDate
      },
      headers: this.getSellerHeaders()
    });
  }
}
