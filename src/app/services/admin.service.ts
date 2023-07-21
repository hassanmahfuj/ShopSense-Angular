import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../interfaces/admin';
import { WithdrawalAdmin } from '../interfaces/withdrawal-admin';

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

  getWithdrawals(): Observable<WithdrawalAdmin[]> {
    return this.http.get<WithdrawalAdmin[]>(this.baseUrl.concat('/withdrawals'));
  }

  updateWithdraw(wa: WithdrawalAdmin): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl.concat('/withdraw'), wa);
  }
}
