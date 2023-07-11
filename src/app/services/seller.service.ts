import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Seller } from '../interfaces/seller';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  private baseUrl: string = 'http://localhost:8080/seller';

  constructor(private http: HttpClient) { }

  sellerLogin(seller: Seller): Observable<Seller> {
    return this.http.post<Seller>(this.baseUrl.concat('/login'), seller);
  }

  getSeller(): Seller {
    return JSON.parse(localStorage.getItem('seller-token') || '{}');    
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.baseUrl.concat('/product/') + id);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl.concat('/products/') + this.getSeller().id);
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

}
