import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../env/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly _httpClient = inject(HttpClient);
  constructor() {}

  getAllProducts(page?: string): Observable<any> {
    if (page) {
      return this._httpClient.get(
        `${environment.baseUrl}/api/v1/products?page=${page}`
      );
    }
    return this._httpClient.get(`${environment.baseUrl}/api/v1/products`);
  }

  getSpecificProducts(productId: string): Observable<any> {
    return this._httpClient.get(
      `${environment.baseUrl}/api/v1/products/${productId}`
    );
  }
}
