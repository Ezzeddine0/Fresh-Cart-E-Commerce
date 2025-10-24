import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../env/environments';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly _HttpCliet = inject(HttpClient);

  constructor() {}
  // myHeaders: any = {
  //   token: localStorage.getItem('userToken'),
  // };

  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);
  addtoCart(id: string): Observable<any> {
    return this._HttpCliet.post(`${environment.baseUrl}/api/v1/cart`, {
      productId: id,
    });
  }

  getUserCart(): Observable<any> {
    return this._HttpCliet.get(`${environment.baseUrl}/api/v1/cart`);
  }

  updataCartQuantity(id: string, data: string): Observable<any> {
    return this._HttpCliet.put(`${environment.baseUrl}/api/v1/cart/${id}`, {
      count: data,
    });
  }

  removeItem(id: string): Observable<any> {
    return this._HttpCliet.delete(`${environment.baseUrl}/api/v1/cart/${id}`);
  }

  deleteCart(): Observable<any> {
    return this._HttpCliet.delete(`${environment.baseUrl}/api/v1/cart`);
  }
}
