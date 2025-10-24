import { IWishList } from './../../core/interfaces/iwish-list';
import { Component, inject, OnInit } from '@angular/core';
import { WishListService } from '../../core/services/wish-list.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css',
})
export class WishListComponent implements OnInit {
  private readonly _WishListService = inject(WishListService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);

  listWishes: IWishList[] = [];

  ngOnInit(): void {
    this._WishListService.getWishList().subscribe({
      next: (res) => {
        console.log(res.data);
        this.listWishes = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addCart(id: string): void {
    this._CartService.addtoCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message);
        this._CartService.cartNumber.next(res.numOfCartItems);
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

  removeWishList(id: string): void {
    this._WishListService.removeWishList(id).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.error('item Removed');
        this._WishListService.getWishList().subscribe({
          next: (res) => {
            console.log(res.data);
            this.listWishes = res.data;
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
