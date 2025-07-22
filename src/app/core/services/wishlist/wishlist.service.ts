import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environement } from '../../../shard/environement/environement';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly _PLATFORM_ID= inject(PLATFORM_ID)
  UserToken:any

 constructor(private _HttpClient:HttpClient) {
     if(isPlatformBrowser(this._PLATFORM_ID)){
       this.UserToken ={token : sessionStorage.getItem('token')}
     }
     else(
       this.UserToken ={token : null}
     )
    }
  

  AddProductToWishlist(p_id:string):Observable<any>{
    return this._HttpClient.post(`${environement.baseUrl}/api/v1/wishlist`,{"productId":p_id},{headers :this.UserToken})
  }

  GetLoggedUserWishlist():Observable<any>{
    return this._HttpClient.get(`${environement.baseUrl}/api/v1/wishlist`,{headers :this.UserToken})
  }

  removeProductFromWishlist (p_id:string):Observable<any>{
    return this._HttpClient.delete(`${environement.baseUrl}/api/v1/wishlist/${p_id}`,{headers :this.UserToken})
  }
}