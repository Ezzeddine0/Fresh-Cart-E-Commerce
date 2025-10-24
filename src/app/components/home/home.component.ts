import { Subscription } from 'rxjs';
import { IProduct } from './../../core/interfaces/iproduct';
import { ProductsService } from './../../core/services/products.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../../core/services/category.service';
import { ICategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/interfaces/icart';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../core/services/wish-list.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselModule,
    RouterLink,
    TitleCasePipe,
    CurrencyPipe,
    TermtextPipe,
    SearchPipe,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoryService = inject(CategoryService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _WishListService = inject(WishListService);

  // owl carousel
  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: false,
  };
  customOptionsCategories: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 3,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    },
    nav: false,
  };
  cart!: ICart;
  searchWord: string = '';
  products: IProduct[] = [];
  categories: ICategory[] = [];
  getAllProductSubscribe!: Subscription;
  getAllCategories!: Subscription;
  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cart = res.data;
      },
      error: (err) => {
        console.log(`error cart : ${err}`);
      },
    });
    this.getAllProductSubscribe = this._ProductsService
      .getAllProducts()
      .subscribe({
        next: (res) => {
          this.products = res.data;
          console.log(this.products);
        },
        error: (err) => {
          console.log(err);
        },
      });

    this.getAllCategories = this._CategoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
        console.log(this.categories);
      },
      error: (err) => {
        console.log(err);
      },
    });

    this._WishListService.getWishList().subscribe({
      next: (res) => {
        console.log(res);
        this.wishListProducts = res.data.map((item: any) => item._id);
        for (let index = 0; index < this.wishListProducts.length; index++) {
          let el: any = document.getElementById(
            `wishListDiv-${this.wishListProducts[index]}`
          );
          el.style.color = 'red';
        }
      },
    });
  }
  wishListProducts: string[] = [];

  // add To Cart
  loadingForadd: boolean = false;
  addtoCart(id: string) {
    this.loadingForadd = true;
    this._CartService.addtoCart(id).subscribe({
      next: (res) => {
        this._CartService.cartNumber.next(res.numOfCartItems);
        this._ToastrService.success(res.message, 'Fresh Cart');
        // this.numOfCartItems = res.numOfCartItems;
        console.log(res);
        this.loadingForadd = false;
      },
      error: (err) => {
        console.log(err);
        this.loadingForadd = false;
      },
    });
  }

  addRemoveWish(id: string) {
    if (this.wishListProducts.includes(id)) {
      // Remove from wishlist
      this._WishListService.removeWishList(id).subscribe({
        next: (res) => {
          this.wishListProducts = this.wishListProducts.filter(
            (pid) => pid !== id
          );
          this._ToastrService.success(res.message, 'Fresh Cart');
        },
        error: (err) => {
          this._ToastrService.error(err.error.message, 'Fresh Cart');
        },
      });
    } else {
      // Add to wishlist
      this._WishListService.addWishList(id).subscribe({
        next: (res) => {
          this.wishListProducts.push(id);
          this._ToastrService.success(res.message, 'Fresh Cart');
        },
        error: (err) => {
          this._ToastrService.error(err.error.message, 'Fresh Cart');
        },
      });
    }
  }

  //
  ngOnDestroy(): void {
    this.getAllProductSubscribe?.unsubscribe();
    this.getAllProductSubscribe?.unsubscribe();
  }
}
