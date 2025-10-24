import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit, OnDestroy {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
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

  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _ngsSpinnerService = inject(NgxSpinnerService);
  productId: any = '';
  imgs: any[] = [];

  getParamSub!: Subscription;
  getDetailsSub!: Subscription;
  product: IProduct | null = null;
  ngOnInit(): void {
    this._ngsSpinnerService.show('loading-1');
    this.getParamSub = this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        this.productId = p.get('id');
        this.getDetailsSub = this._ProductsService
          .getSpecificProducts(this.productId)
          .subscribe({
            next: (res) => {
              this.product = res.data;
              console.log(this.product);
              this.imgs.push(this.product?.imageCover);
              if (this.product)
                for (
                  let index = 0;
                  index < this.product?.images.length;
                  index++
                ) {
                  this.imgs.push(this.product.images[index]);
                }
              {
              }
              this._ngsSpinnerService.hide('loading-1');
            },
            error: (err) => {
              console.log(err);
              this._ngsSpinnerService.hide('loading-1');
            },
          });
      },
      error: (err) => {},
    });
  }

  ngOnDestroy(): void {
    this.getParamSub.unsubscribe();
    this.getDetailsSub.unsubscribe();
  }

  // changeImg(index: any) {
  //   let selectedImg: any = document.getElementById(`img${index}`);
  //   let mainImg: any = document.getElementById('mainImg');
  //   let temp = selectedImg.src;
  //   selectedImg.src = mainImg.src;
  //   mainImg.src = temp;
  // }
}
