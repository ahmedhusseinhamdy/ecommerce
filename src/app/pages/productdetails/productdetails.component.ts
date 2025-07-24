import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/products/product.service';
import { IProduct } from '../../core/interfaces/products/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { ToastrService } from 'ngx-toastr';

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
  private readonly _WishlistService = inject(WishlistService)
  private readonly _toastr = inject(ToastrService);
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
    this._CartService.AddProductToCart(this.productID).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

   addToWishlist(p_id:string , e:Event){ 
    this._WishlistService.AddProductToWishlist(p_id ).subscribe({
     next:(res)=>{
       console.log(res);
       this._toastr.success('Product added to wishlist successfully!',"",
        {
          closeButton:true,
          timeOut:5000,  
        })
        let hearticon = e.target as HTMLElement
        hearticon.classList.add('heart')
        
     },
     error:(err)=>{
       console.log(err);
       this._toastr.error('Failed to add product to cart!')
  
     }
    })
   }

}
