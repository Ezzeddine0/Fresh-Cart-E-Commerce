import { Component, inject, OnInit, Pipe } from '@angular/core';
import { AllordersService } from '../../core/services/allorders.service';
import { ToastrService } from 'ngx-toastr';
import { pipe } from 'rxjs';
import { CurrencyPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { IAllOrders } from '../../core/interfaces/iall-orders';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CurrencyPipe, NgFor, NgIf, NgClass, DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
})
export class AllordersComponent implements OnInit {
  private readonly _AllordersService = inject(AllordersService);

  orders: IAllOrders[] = [];

  ngOnInit(): void {
    this._AllordersService.getOrders().subscribe({
      next: (res) => {
        console.log(res);
        this.orders = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
