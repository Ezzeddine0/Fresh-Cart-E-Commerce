import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../env/environments';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  _HttpClient = inject(HttpClient);
  url = window.location.origin;
  constructor() {}

  checkOut(cartId: string, data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${this.url}`,
      { shippingAddress: data }
    );
  }
}
// .
