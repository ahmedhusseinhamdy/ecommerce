import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/products/product.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/interfaces/products/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchhPipe } from '../../shard/pipes/search/searchh.pipe';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-products',
  imports: [CarouselModule, SearchhPipe, FormsModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {

  searchValue: string = ''
  ProductsData!: IProduct[]
  ProductsSub!: Subscription
  private readonly _ProductService = inject(ProductService);
  private readonly _CartService = inject(CartService);
  private readonly _toastr = inject(ToastrService);

  ngOnInit(): void {
    this.ProductsSub = this._ProductService.getAllproducts().subscribe({
      next: (res) => {
        this.ProductsData = res.data
      },
      error: (err) => {
        console.log(err);
      },
    })
  }
  ngOnDestroy(): void {
    this.ProductsSub?.unsubscribe()
  }



  addTocart(p_id: string) {
    this._CartService.addProductCart(p_id).subscribe({
      next: (res) => {
        console.log(res.numOfCartItems);
        //next ()to set value in behaviour suibject 
        this._CartService.cartcount.next(res.numOfCartItems);
        this._toastr.success(res.message, 'FershCart',
          {
            closeButton: true,
            timeOut: 1500,
            progressBar: true,
            progressAnimation: "decreasing",
            toastClass: 'notifications-color',
            positionClass: 'notifications-position'
          });
      },
      error: (err) => {
        console.log(err);
        this._toastr.error(err.message, 'FershCart')
      }
    })
  }


}
