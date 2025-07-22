import { Component, OnInit } from '@angular/core';
import { Iwishlist } from '../../../core/interfaces/wishlist/iwishlist';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

  constructor(private _WishlistService:WishlistService , private toastr: ToastrService){}
  
  wishlistProducts!:Iwishlist[]
  ngOnInit(): void {
      this._WishlistService.GetLoggedUserWishlist().subscribe({
        next: (res) => {
          console.log(res);
          this.wishlistProducts = res.data
          console.log(this.wishlistProducts = res.data);
          
        },
        error: (error) => {
          console.error(error);
        }
      })
  }

  removeProduct(p_id:string){
    this._WishlistService.removeProductFromWishlist(p_id).subscribe({
      next: (res) => {
        console.log(res);
        this.ngOnInit()
        this.toastr.info('This item removed successfully')
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}