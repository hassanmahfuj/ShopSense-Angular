import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WishlistDetail } from '../interfaces/wishlist-detail';
import { CustomerService } from './customer.service';
import { Wishlist } from '../interfaces/wishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private baseUrl = 'http://localhost:8080/wishlist';

  constructor(
    private http: HttpClient,
    private customerService: CustomerService
  ) { }

  getWishlists(): Observable<WishlistDetail[]> {
    return this.http.get<WishlistDetail[]>(this.baseUrl.concat('?customerId=') + this.customerService.getCustomer().id);
  }

  removeFromWishlist(w: Wishlist): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl.concat('/remove'), w);
  }
}