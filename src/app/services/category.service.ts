import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl.concat('/categories'));
  }
}
