import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/products/product.service';
import { IProduct } from '../../core/interfaces/products/iproduct';
import { Icategory } from '../../core/interfaces/categories/icategory';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { AuthService } from '../../core/services/authentication/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';


@Component({
  selector: 'app-product',
  imports: [ FormsModule , RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
    productData!:IProduct[]
    productsSub!:Subscription
    categoriesData!:Icategory[]
   constructor(private _ProductsService:ProductService ,private _CategoriesService:CategoriesService ,private _AuthService:AuthService, private _CartService:CartService, private toastr: ToastrService , private _WishlistService:WishlistService){}
    ngOnInit(): void {
      this._AuthService.decodeUserToken()
  
      this._CategoriesService.getAllCategories().subscribe({
        next:(res)=>{
          this.categoriesData=res.data
          console.log(this.categoriesData);
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
     this.productsSub = this._ProductsService.getAllproducts().subscribe({
      next:(res)=>{
        this.productData=res.data
        console.log(this.productData);
      },
      error:(err)=>{
        console.error(err)
      }
     })
   }
  
   addTocart(p_id:string){
    this._CartService.AddProductToCart(p_id).subscribe({
      next:(res)=>{
        console.log(res);
        this.toastr.success('Product added to cart successfully!',"",
          {
            closeButton:true,
            timeOut:5000,
            
          }
        )
      },
      error:(err)=>{
        console.log(err);
        this.toastr.error('Failed to add product to cart!')
          
      }
    })
   }
  
   addToWishlist(p_id:string , e:Event){
   
    this._WishlistService.AddProductToWishlist(p_id ).subscribe({
     next:(res)=>{
       console.log(res);
      
       this.toastr.success('Product added to wishlist successfully!',"",
        {
          closeButton:true,
          timeOut:5000,
          
        })
        let hearticon = e.target as HTMLElement
        hearticon.classList.add('heart')
        
     },
     error:(err)=>{
       console.log(err);
       this.toastr.error('Failed to add product to cart!')
  
     }
    })
   }
  
  
   ngOnDestroy(): void {
     this.productsSub?.unsubscribe()
   }
}