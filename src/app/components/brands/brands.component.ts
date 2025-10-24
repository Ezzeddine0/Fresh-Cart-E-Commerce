import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { IBrands } from '../../core/interfaces/ibrands';
import { ISpecBrand } from '../../core/interfaces/ispec-brand';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  private readonly _BrandsService = inject(BrandsService);

  listBrands: IBrands[] = [];

  ngOnInit(): void {
    this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res.data);
        this.listBrands = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  specBrand!: ISpecBrand;
  barndspec: boolean = false;

  getSpecBrand(id: string): void {
    this._BrandsService.getSpecBrand(id).subscribe({
      next: (res) => {
        this.barndspec = true;
        console.log(res.data);
        this.specBrand = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  hide(): void {
    this.barndspec = false;
  }
}
