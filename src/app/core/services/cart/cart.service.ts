import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environement } from '../../../shard/environement/environement';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  userToken: any

  cartcount: BehaviorSubject<number> = new BehaviorSubject(0)
  //Dynamic property ----> BehaviourSubject(observa)


  constructor(private _HttpClient: HttpClient, @Inject(PLATFORM_ID) _PLATFORM_ID: any) {

    if (isPlatformBrowser(_PLATFORM_ID)) {
      this.userToken = { token: sessionStorage.getItem('token') };
    } else {
      this.userToken = {};
    }
  }

  GetLoggedUserCart(): Observable<any> {
    //headers : {token :sessionStorage.getItem('token')}
    return this._HttpClient.get(`${environement.baseUrl}/api/v1/cart`, { headers: this.userToken })
  }

  addProductCart(p_id: string): Observable<any> {
    return this._HttpClient.post(`${environement.baseUrl}/api/v1/cart`, { "productId": p_id }, { headers: this.userToken })
  }

  RemoveSpecificCartItem(p_id: string): Observable<any> {
    return this._HttpClient.delete(`${environement.baseUrl}/api/v1/cart/${p_id}`, { headers: this.userToken })
  }

  Updatecartproductquantity(p_id: string, count: number): Observable<any> {
    return this._HttpClient.put(`${environement.baseUrl}/api/v1/cart/${p_id}`, { "count": count }, { headers: this.userToken })
  }


  Clearusercart(): Observable<any> {
    return this._HttpClient.delete(`${environement.baseUrl}/api/v1/cart`, { headers: this.userToken })
  }

}
//Get | dalete ---> (URL , Options)
//post |put ---> (URL,BODY,Options)   