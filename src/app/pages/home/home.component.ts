import { CategoriesService } from './../../core/services/categories/categories.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/interfaces/products/iproduct';
import { ProductService } from './../../core/services/products/product.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Icategory } from '../../core/interfaces/categories/icategory';
import { SearchhPipe } from '../../shard/pipes/search/searchh.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/authentication/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, SearchhPipe, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  minSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 2000,
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
  categoriesSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 2000,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1280: {
        items: 6
      }
    },
    nav: false
  }

  searchValue: string = ''
  categoriesData!: Icategory[]
  categoriesSub!: Subscription
  ProductsData!: IProduct[]
  ProductsSub!: Subscription
  private readonly _ProductService = inject(ProductService);
  private readonly _AuthService = inject(AuthService);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _CartService = inject(CartService);
  private readonly _toastr = inject(ToastrService);


  ngOnInit(): void {
    this._AuthService.userInfo
    this.categoriesSub = this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesData = res.data
      },
      error: (err) => {
        console.log(err);
      },
    })

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
    this.categoriesSub?.unsubscribe()
    this.ProductsSub?.unsubscribe()
  }

  addTocart(p_id: string) {
    this._CartService.AddProductToCart(p_id).subscribe({
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
