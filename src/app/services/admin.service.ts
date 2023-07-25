import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../interfaces/admin';
import { WithdrawalAdmin } from '../interfaces/withdrawal-admin';
import { Product } from '../interfaces/product';
import { Seller } from '../interfaces/seller';
import { Customer } from '../interfaces/customer';
import { AdminStat } from '../interfaces/admin-stat';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl: string = 'http://localhost:8080/admin';

  constructor(private http: HttpClient) { }

  adminLogin(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(this.baseUrl.concat('/login'), admin);
  }

  getAdmin(): Admin {
    return JSON.parse(localStorage.getItem('admin-token') || '{}');
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl.concat('/products'));
  }

  updateProduct(p: Product): Observable<Product> {
    return this.http.put<Product>(this.baseUrl.concat('/product'), p);
  }

  getAllSellers(): Observable<Seller[]> {
    return this.http.get<Seller[]>(this.baseUrl.concat('/sellers'));
  }

  updateSeller(a: Seller): Observable<Seller> {
    return this.http.put<Seller>(this.baseUrl.concat('/seller'), a);
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl.concat('/customers'));
  }

  updateCustomer(a: Customer): Observable<Customer> {
    return this.http.put<Customer>(this.baseUrl.concat('/customer'), a);
  }

  getWithdrawals(): Observable<WithdrawalAdmin[]> {
    return this.http.get<WithdrawalAdmin[]>(this.baseUrl.concat('/withdrawals'));
  }

  updateWithdraw(wa: WithdrawalAdmin): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl.concat('/withdraw'), wa);
  }

  // get stat
  getStat(): Observable<AdminStat> {
    return this.http.get<AdminStat>(this.baseUrl.concat('/stat'));
  }
}
