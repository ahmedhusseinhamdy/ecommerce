import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/products/product.service';
import { IProduct } from '../../core/interfaces/products/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-productdetails',
  imports: [CarouselModule],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss'
})
export class ProductdetailsComponent implements OnInit {

  componentip: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: false
  }

  productID!: string
  productdetails: IProduct | null = null

  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _CartService = inject(CartService)

  constructor(private _ProductService: ProductService) { }

  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.productID = param.get('p_id')!;

      },
      error: (err) => {
        console.log(err);
      }
    })

    this._ProductService.getSpecificProducts(this.productID).subscribe({
      next: (res) => {
        this.productdetails = res.data
        console.log(this.productdetails);
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

   addTocart() {
    this._CartService.addProductCart(this.productID).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  
}
