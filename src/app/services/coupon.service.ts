import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coupon } from '../interfaces/coupon';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private baseUrl: string = 'http://localhost:8080/coupon';

  constructor(private http: HttpClient) { }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("admin-jwt")
    })
  }

  checkCoupon(code: string): Observable<Coupon> {
    return this.http.get<Coupon>(this.baseUrl.concat('/check'), {
      params: { code: code }
    });
  }

  getAllCoupons(): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(this.baseUrl.concat('/all'), { headers: this.getHeaders() });
  }

  createCoupon(c: Coupon): Observable<Coupon> {
    return this.http.post<Coupon>(this.baseUrl, c, { headers: this.getHeaders() });
  }

  updateCoupon(c: Coupon): Observable<boolean> {
    return this.http.put<boolean>(this.baseUrl, c, { headers: this.getHeaders() });
  }

  deleteCoupon(couponId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl, {
      params: { couponId },
      headers: this.getHeaders()
    });
  }
}
