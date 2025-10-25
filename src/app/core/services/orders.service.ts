import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../env/environments';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly _HttpClient = inject(HttpClient);
  private readonly baseRedirectUrl = `${window.location.origin}/Fresh-Cart-E-Commerce`;

  constructor() {}

  checkOut(cartId: string, data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${this.baseRedirectUrl}`,
      { shippingAddress: data }
    );
  }
}
