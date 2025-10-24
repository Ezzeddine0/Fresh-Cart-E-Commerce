import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../core/services/category.service';
import { ICategory } from '../../core/interfaces/icategory';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  private readonly _CategoriesService = inject(CategoryService);

  listCaregories: ICategory[] = [];
  id: string = '';

  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.id = res.data.id;
        this.listCaregories = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getCategory(): void {
    this._CategoriesService.getSpecificCategory(this.id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.listCaregories = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
