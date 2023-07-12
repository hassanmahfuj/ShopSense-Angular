import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../interfaces/customer';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl: string = 'http://localhost:8080/customer';

  constructor(private http: HttpClient) { }

  customerLogin(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl.concat('/login'), customer);
  }

  getCustomer(): Customer {
    return JSON.parse(localStorage.getItem('customer-token') || '{}');
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.baseUrl.concat('/product/') + id);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl.concat('/products'));
  }
}
