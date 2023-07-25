import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl: string = 'http://localhost:8080/category';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl.concat('/all'));
  }

  create(c: Category): Observable<Category> {
    return this.http.post<Category>(this.baseUrl, c);
  }

  update(c: Category): Observable<boolean> {
    return this.http.put<boolean>(this.baseUrl, c);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl, {
      params: { id }
    });
  }
}
