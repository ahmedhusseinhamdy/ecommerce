import { Product } from './../../core/interfaces/cart/icart';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../core/interfaces/cart/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {


  cartData: ICart | null = null
  
  constructor(private toastr: ToastrService) { }
  private readonly _CartService = inject(CartService)

  ngOnInit(): void {
    // this._CartService.GetLoggedUserCart().subscribe({
    //   next: (res) => {
    //     this.cartData = res.data
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // })
  }

  deleteItemFromCart(p_id: string) {
    this._CartService.RemoveSpecificCartItem(p_id).subscribe({
      next: (res) => {
        this.cartData = res.data;//overwrite
        this._CartService.cartcount.next(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  updateCount(p_id: string, count: number) {
    if (count >= 1) {
      this._CartService.Updatecartproductquantity(p_id, count).subscribe({
        next: (res) => {
          console.log(res);
          this.cartData = res.data
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }
  clearCart() {
    this._CartService.Clearusercart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartData = {} as ICart;
        this.toastr.info("The cart has been cleared!")
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}


