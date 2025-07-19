import { Component, inject, input, InputSignal, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/authentication/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {

  navCartCont!: number
  cancel!: Subscription

  private readonly _Router = inject(Router);
  private readonly _AuthService = inject(AuthService);
  private readonly _CartService = inject(CartService);

  check: InputSignal<boolean> = input(false);

    ngOnInit(): void {
      this._CartService.GetLoggedUserCart().subscribe({
        next: (res) => {
          this.navCartCont = res.numOfCartItems
        }
      });

      this.cancel = this._CartService.cartcount.subscribe({
        next: (value) => {
          this.navCartCont = value
        },
      })
    }

ngOnDestroy(): void {
  this.cancel?.unsubscribe()
}

logOut() {
  sessionStorage.removeItem('token');
  this._Router.navigate(['/login']);
  this._AuthService.userInfo = null
}
}
