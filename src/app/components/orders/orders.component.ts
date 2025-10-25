import { ActivatedRoute } from '@angular/router';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/interfaces/icart';
import { Subscription } from 'rxjs';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit, OnDestroy {
  _FormBuilder = inject(FormBuilder);
  _OrderService = inject(OrdersService);
  _ActivatedRoute = inject(ActivatedRoute);
  checkOutForm: FormGroup = this._FormBuilder.group({
    details: [null, []],
    phone: [null, []],
    city: [null, []],
  });

  cartId!: string | null;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        this.cartId = p.get('id');
        console.log(this.cartId);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  //
  isloading: boolean = false;
  checkOutSub!: Subscription;
  checkOut() {
    this.isloading = true;
    this.checkOutSub = this._OrderService
      .checkOut(this.cartId!, this.checkOutForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);

          window.open(res.session.url, '/Fresh-Cart-E-Commerce', '_self');
        },
        error: (err) => {
          this.isloading = false;

          console.log(err);
        },
        complete: () => {
          this.isloading = false;
        },
      });
  }

  ngOnDestroy(): void {}
}
