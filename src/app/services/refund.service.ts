import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RefundDetails } from '../interfaces/refund-details';
import { Observable } from 'rxjs';
import { SellerService } from './seller.service';

@Injectable({
  providedIn: 'root'
})
export class RefundService {

  constructor(
    private http: HttpClient,
    private sellerService: SellerService
  ) { }

  private host: string = 'http://localhost:8080';

  getAdminHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("admin-jwt")
    });
  }

  getSellerHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("seller-jwt")
    });
  }

  getCustomerHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("customer-jwt")
    });
  }

  // apis
  createRefund(a: RefundDetails): Observable<RefundDetails> {
    return this.http.post<RefundDetails>(this.host.concat('/customer/refund'), a, {
      headers: this.getCustomerHeaders()
    });
  }

  updateRefund(a: RefundDetails): Observable<RefundDetails> {
    return this.http.put<RefundDetails>(this.host.concat('/admin/refund'), a, {
      headers: this.getAdminHeaders()
    });
  }

  getAllRefund(): Observable<RefundDetails[]> {
    return this.http.get<RefundDetails[]>(this.host.concat('/admin/refund'), {
      headers: this.getAdminHeaders()
    });
  }

  getSellerRefund(): Observable<RefundDetails[]> {
    return this.http.get<RefundDetails[]>(this.host.concat('/seller/refund/' + this.sellerService.getSellerToken().id), {
      headers: this.getSellerHeaders()
    });
  }
}
