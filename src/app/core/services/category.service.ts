import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../env/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly _httpClient = inject(HttpClient);

  constructor() {}

  getAllCategories(): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/api/v1/categories`);
  }

  getSpecificCategory(categoryId: string): Observable<any> {
    return this._httpClient.get(
      `${environment.baseUrl}/api/v1/categories/${categoryId}`
    );
  }
}
