import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../interfaces/customer';
import { Observable, Subject } from 'rxjs';
import { Product } from '../interfaces/product';
import { CartItem } from '../interfaces/cart-item';
import { Order } from '../interfaces/order';
import { OrderDetails } from '../interfaces/order-details';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = 'http://localhost:8080/customer';

  private parentMethodCallSource = new Subject<any>();

  parentMethodCalled$ = this.parentMethodCallSource.asObservable();

  toUpdateCart() {
    this.parentMethodCallSource.next("");
  }

  customerLogin(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl.concat('/login'), customer);
  }

  customerSignup(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl.concat('/signup'), customer);
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

  addToCart(cartItem: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(this.baseUrl.concat('/cart'), cartItem);
  }

  updateCart(cartItem: CartItem): Observable<boolean> {
    return this.http.put<boolean>(this.baseUrl.concat('/cart'), cartItem);
  }

  removeFromCart(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl.concat('/cart'), {
      params: { "id": id }
    });
  }

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.baseUrl.concat('/cart'), {
      params: { "id": this.getCustomer().id }
    });
  }



  placeOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.baseUrl.concat('/order'), order);
  }

  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(this.baseUrl.concat('/order'), {
      params: { "id": id }
    });
  }

  getOrders(id: number): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl.concat('/orders'), {
      params: { "id": id }
    });
  }

  trackOrder(id: number): Observable<OrderDetails> {
    return this.http.get<OrderDetails>(this.baseUrl.concat('/track'), {
      params: { "id": id }
    });
  }
}
