import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../interfaces/admin';
import { WithdrawalAdmin } from '../interfaces/withdrawal-admin';
import { Product } from '../interfaces/product';
import { Seller } from '../interfaces/seller';
import { Customer } from '../interfaces/customer';
import { AdminStat } from '../interfaces/admin-stat';
import { Order } from '../interfaces/order';
import { OrderDetails } from '../interfaces/order-details';
import { ReportSales } from '../interfaces/report-sales';
import { AuthRequest } from '../interfaces/auth-request';
import { AuthResponse } from '../interfaces/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl: string = 'http://localhost:8080/admin';

  constructor(private http: HttpClient) { }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("admin-jwt")
    })
  }

  adminLogin(req: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.baseUrl.concat('/login'), req);
  }

  getAdmin(): Admin {
    return JSON.parse(localStorage.getItem('admin-token') || '{}');
  }

  getAllProducts(): Observable<Product[]> {
    console.log(33);
    return this.http.get<Product[]>(this.baseUrl.concat('/products'), { headers: this.getHeaders() });
  }

  updateProduct(p: Product): Observable<Product> {
    return this.http.put<Product>(this.baseUrl.concat('/product'), p, { headers: this.getHeaders() });
  }

  getAllSellers(): Observable<Seller[]> {
    return this.http.get<Seller[]>(this.baseUrl.concat('/sellers'), { headers: this.getHeaders() });
  }

  updateSeller(a: Seller): Observable<Seller> {
    return this.http.put<Seller>(this.baseUrl.concat('/seller'), a, { headers: this.getHeaders() });
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl.concat('/customers'), { headers: this.getHeaders() });
  }

  updateCustomer(a: Customer): Observable<Customer> {
    return this.http.put<Customer>(this.baseUrl.concat('/customer'), a, { headers: this.getHeaders() });
  }

  getWithdrawals(): Observable<WithdrawalAdmin[]> {
    return this.http.get<WithdrawalAdmin[]>(this.baseUrl.concat('/withdrawals'), { headers: this.getHeaders() });
  }

  updateWithdraw(wa: WithdrawalAdmin): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl.concat('/withdraw'), wa, { headers: this.getHeaders() });
  }

  // get stat
  getStat(): Observable<AdminStat> {
    return this.http.get<AdminStat>(this.baseUrl.concat('/stat'), { headers: this.getHeaders() });
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl.concat('/orders'), { headers: this.getHeaders() });
  }

  getOrder(orderId: number): Observable<Order> {
    return this.http.get<Order>(this.baseUrl.concat('/order'), {
      params: { "orderid": orderId }, headers: this.getHeaders()
    });
  }

  updateOrder(order: OrderDetails): Observable<boolean> {
    return this.http.put<boolean>(this.baseUrl.concat('/order'), order, { headers: this.getHeaders() });
  }

  getShippedOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl.concat('/orders/shipped'), { headers: this.getHeaders() });
  }

  getSalesReport(startDate: string, endDate: string): Observable<ReportSales[]> {
    return this.http.get<ReportSales[]>(this.baseUrl.concat('/report/sales'), {
      params: { startDate, endDate },
      headers: this.getHeaders()
    });
  }
}
