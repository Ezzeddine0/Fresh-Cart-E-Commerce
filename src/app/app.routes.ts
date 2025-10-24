import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';

export const routes: Routes = [
  // 🔹 Public (Auth) Layout
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [loggedGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },

      {
        path: 'login',
        loadComponent: () =>
          import('./components/login/login.component').then(
            (c) => c.LoginComponent
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./components/register/register.component').then(
            (c) => c.RegisterComponent
          ),
      },
      {
        path: 'forget',
        loadComponent: () =>
          import('./components/forgetpassword/forgetpassword.component').then(
            (c) => c.ForgetpasswordComponent
          ),
      },
    ],
  },

  // 🔹 Protected (App) Layout
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },

      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home.component').then(
            (c) => c.HomeComponent
          ),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./components/product/product.component').then(
            (c) => c.ProductComponent
          ),
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./components/brands/brands.component').then(
            (c) => c.BrandsComponent
          ),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./components/cart/cart.component').then(
            (c) => c.CartComponent
          ),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./components/categories/categories.component').then(
            (c) => c.CategoriesComponent
          ),
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./components/details/details.component').then(
            (c) => c.DetailsComponent
          ),
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./components/allorders/allorders.component').then(
            (c) => c.AllordersComponent
          ),
      },
      {
        path: 'orders/:id',
        loadComponent: () =>
          import('./components/orders/orders.component').then(
            (c) => c.OrdersComponent
          ),
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./components/wish-list/wish-list.component').then(
            (c) => c.WishListComponent
          ),
      },
    ],
  },

  // 🔹 Fallback Route
  {
    path: '**',
    loadComponent: () =>
      import('./components/notfound/notfound.component').then(
        (c) => c.NotfoundComponent
      ),
  },
];
