import { SearchPipe } from './../../core/pipes/search.pipe';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { WishListService } from '../../core/services/wish-list.service';
import { IProduct } from '../../core/interfaces/iproduct';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule, RouterLink, SearchPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit, OnDestroy {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _WishListService = inject(WishListService);

  listProduct: IProduct[] = [];
  allProductSub!: Subscription;
  text: string = '';
  idProductWishlist: string[] = []; // ✅ properly typed

  ngOnInit(): void {
    // Load all products
    this.allProductSub = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.listProduct = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });

    // ✅ Load wishlist and extract only product IDs
    this._WishListService.getWishList().subscribe({
      next: (res) => {
        // API returns {status, count, data: [ {_id, ...}, {...} ]}
        this.idProductWishlist = res.data.map((item: any) => item._id);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.allProductSub?.unsubscribe();
  }

  addCart(id: string): void {
    this._CartService.addtoCart(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
        this._CartService.cartNumber.next(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addWishList(id: string): void {
    this._WishListService.addWishList(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
        // add new product ID to wishlist list
        this.idProductWishlist.push(id);
      },
      error: (err) => {
        this._ToastrService.error(err.error.message);
      },
    });
  }

  removeWishList(id: string): void {
    this._WishListService.removeWishList(id).subscribe({
      next: (res) => {
        this._ToastrService.info(res.message);
        // remove it from local array
        this.idProductWishlist = this.idProductWishlist.filter(
          (pid) => pid !== id
        );
      },
      error: (err) => {
        this._ToastrService.error(err.error.message);
      },
    });
  }
}
