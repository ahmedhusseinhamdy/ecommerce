import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../core/interfaces/cart/icart';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  constructor(private toastr: ToastrService) { }
  private readonly _CartService = inject(CartService)

  userCart!: ICart
  cartid!: string
  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next: (res) => {
        this.userCart = res.data;
        console.log(this.userCart);
        console.log("cartid", res);
        console.log(this.cartid);


      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  deleteProduct(p_id: string) {
    this._CartService.RemovespecificcartItem(p_id).subscribe({
      next: (res) => {
        console.log(res);
        this.userCart = res.data;
        this.toastr.info("The product has been removed from the cart!")
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  clearCart() {
    this._CartService.Clearusercart().subscribe({
      next: (res) => {
        console.log(res);
        this.userCart = {} as ICart;
        this.toastr.info("The cart has been cleared!")
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  updateCount(p_id: string, count: number) {
    this._CartService.UpdateCartProductQuantity(p_id, count).subscribe({
      next: (res) => {
        console.log(res);
        this.userCart = res.data;
        this.toastr.success("The quantity has been updated !")
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("Failed to update the quantity !")
      }
    })
  }
}