import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl: string = 'http://localhost:8080/category';

  constructor(private http: HttpClient) { }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("admin-jwt")
    })
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl.concat('/all'), { headers: this.getHeaders() });
  }

  create(c: Category): Observable<Category> {
    return this.http.post<Category>(this.baseUrl, c, { headers: this.getHeaders() });
  }

  update(c: Category): Observable<boolean> {
    return this.http.put<boolean>(this.baseUrl, c, { headers: this.getHeaders() });
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl, {
      params: { id },
      headers: this.getHeaders()
    });
  }
}
