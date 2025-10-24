import { AuthService } from './../../core/services/auth.service';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { setInterval } from 'timers/promises';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss',
})
export class NavBlankComponent {
  _Router = inject(Router);
  _AuthService = inject(AuthService);
  private readonly _cartService = inject(CartService);
  logout() {
    setTimeout(() => {
      this._AuthService.logout();
      this._Router.navigate(['/login']);
    }, 300);
  }
  numberOfCartItem = 0;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._cartService.getUserCart().subscribe({
      next: (res) => {
        this._cartService.cartNumber.next(res.numOfCartItems);
      },
    });
    this._cartService.cartNumber.subscribe({
      next: (data) => {
        this.numberOfCartItem = data;
      },
    });
  }
}
