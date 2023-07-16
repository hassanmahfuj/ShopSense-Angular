import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coupon } from '../interfaces/coupon';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private baseUrl: string = 'http://localhost:8080/coupon';

  constructor(private http: HttpClient) { }

  checkCoupon(code: string): Observable<Coupon> {
    return this.http.get<Coupon>(this.baseUrl.concat('/check'), {
      params: { code: code }
    });
  }
}
