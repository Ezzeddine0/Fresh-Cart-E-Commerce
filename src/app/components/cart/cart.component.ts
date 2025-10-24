import { ICart } from './../../core/interfaces/icart';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [TermtextPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  _CartService = inject(CartService);

  cart!: ICart;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._CartService.getUserCart().subscribe({
      next: (res) => {
        this.cart = res.data;
        console.log(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  isloading = false;
  updateCartQuantity(id: string, count1: number) {
    if (count1 > 0) {
      this.isloading = true;
      let count = count1.toString();
      this._CartService.updataCartQuantity(id, count).subscribe({
        next: (res) => {
          console.log(res);
          this.cart = res.data;
          this.isloading = false;
        },
        error: (err) => {
          console.log(err);
          this.isloading = false;
        },
      });
    }
  }

  removeItemFromCart(id: string) {
    this.isloading = true;
    this._CartService.removeItem(id).subscribe({
      next: (res) => {
        this._CartService.cartNumber.next(res.numOfCartItems);
        console.log(res);
        this.cart = res.data;
        this.isloading = false;
      },
      error: (err) => {
        console.log(err);
        this.isloading = false;
      },
    });
  }

  deleteCart() {
    this.isloading = true;
    this._CartService.deleteCart().subscribe({
      next: (res) => {
        this._CartService.cartNumber.next(0);
        console.log(res);
        this.cart = {} as ICart;
        this.isloading = false;
      },
      error: (err) => {
        console.log(err);
        this.isloading = false;
      },
    });
  }
  //
  ngOnDestroy(): void {}
}
