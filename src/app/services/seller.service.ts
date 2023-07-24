import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Seller } from '../interfaces/seller';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { Order } from '../interfaces/order';
import { OrderDetails } from '../interfaces/order-details';
import { Withdrawal } from '../interfaces/withdrawal';
import { SellerStat } from '../interfaces/seller-stat';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  private baseUrl: string = 'http://localhost:8080/seller';

  categories: string[] = ["Watches", "Furniture", "Mobile", "Clothing", "Shoes"]

  constructor(private http: HttpClient) { }

  sellerLogin(seller: Seller): Observable<Seller> {
    return this.http.post<Seller>(this.baseUrl.concat('/login'), seller);
  }

  sellerSignup(seller: Seller): Observable<Seller> {
    return this.http.post<Seller>(this.baseUrl.concat('/signup'), seller);
  }

  getSellerToken(): Seller {
    return JSON.parse(localStorage.getItem('seller-token') || '{}');
  }

  getSeller(): Observable<Seller> {
    return this.http.get<Seller>(this.baseUrl.concat('/') + this.getSellerToken().id);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.baseUrl.concat('/product/') + id);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl.concat('/products/') + this.getSellerToken().id);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl.concat('/product'), product);
  }

  updateProduct(product: Product): Observable<boolean> {
    return this.http.put<boolean>(this.baseUrl.concat('/product'), product);
  }

  deleteProduct(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl.concat('/product/') + id);
  }

  getOrders(id: number): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl.concat('/orders'), {
      params: { "id": id }
    });
  }

  getOrder(orderId: number, sellerId: number): Observable<Order> {
    return this.http.get<Order>(this.baseUrl.concat('/order'), {
      params: { "orderid": orderId, "sellerid": sellerId }
    });
  }

  updateOrder(order: OrderDetails): Observable<boolean> {
    return this.http.put<boolean>(this.baseUrl.concat('/order'), order);
  }

  requestWithdraw(withdrawal: Withdrawal) {
    return this.http.post<Withdrawal>(this.baseUrl.concat('/withdraw'), withdrawal);
  }

  getWithdrawals() {
    return this.http.get<Withdrawal[]>(this.baseUrl.concat('/withdrawals/') + this.getSellerToken().id);
  }

  // get stat
  getStat(): Observable<SellerStat> {
    return this.http.get<SellerStat>(this.baseUrl.concat('/stat?sellerId=') + this.getSellerToken().id);
  }
}
