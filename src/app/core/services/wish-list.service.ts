import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../env/environments';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  private readonly _HttpClient = inject(HttpClient);

  addWishList(id: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`, {
      productId: id,
    });
  }

  getWishList(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`);
  }

  removeWishList(id: string): Observable<any> {
    return this._HttpClient.delete(
      `${environment.baseUrl}/api/v1/wishlist/${id}`
    );
  }
}
