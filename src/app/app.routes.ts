import { ChecoutComponent } from './pages/checout/checout.component';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth-layout/auth/auth.component';
import { MainComponent } from './layouts/main-layout/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    {
        path: '', component: AuthComponent, children: [
            { path: 'login', component: LoginComponent, title: 'login' },
            { path: 'register', loadComponent: () => import('./pages/register/register.component').then((classes) => classes.RegisterComponent), title: 'Register' }

        ]
    },
    {
        path: '', component: MainComponent, canActivate: [authGuard], children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent, title: 'Home' },
            { path: 'products', loadComponent: () => import('./pages/products/products.component').then((classes) => classes.ProductsComponent), title: 'Product ' },
            { path: 'brands', loadComponent: () => import('./pages/brands/brands.component').then((classes) => classes.BrandsComponent), title: 'Brands' },
            { path: 'categories', loadComponent: () => import('./pages/categories/categories.component').then((classes) => classes.CategoriesComponent), title: 'Categories' },
            { path: 'cart', loadComponent: () => import('./pages/cart/cart.component').then((classes) => classes.CartComponent), title: 'Cart' },
            { path: 'allorders', loadComponent: () => import('./pages/allorders/allorders.component').then((classes) => classes.AllordersComponent), title: 'allorders' },
            { path: 'checout/:c_id', loadComponent: () => import('./pages/checout/checout.component').then((classes) => classes.ChecoutComponent), title: 'checout' },
            { path: 'wishlist', loadComponent: () => import('./pages/wishlist/wishlist/wishlist.component').then((classes) => classes.WishlistComponent), title: 'checout' },
            { path: 'product-details/:p_id', loadComponent: () => import('./pages/productdetails/productdetails.component').then((classes) => classes.ProductdetailsComponent), title: 'Details' },
            { path: '**', component: NotfoundComponent, title: 'Error 404' }
        ]
    },
];  