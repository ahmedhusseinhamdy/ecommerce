import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environement } from '../../../shard/environement/environement';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  UserToken: any
  cartcount: BehaviorSubject<number> = new BehaviorSubject(0);

  private readonly _PLATFORM_ID = inject(PLATFORM_ID)

  constructor(private _HttpClient: HttpClient) {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.UserToken = { token: sessionStorage.getItem('token') }
    }
    else (
      this.UserToken = { token: null }
    )
  }

  getUserCart(): Observable<any> {
    return this._HttpClient.get(`${environement.baseUrl}/api/v1/cart`, { headers: this.UserToken })
  }

  AddProductToCart(p_id: string): Observable<any> {
    return this._HttpClient.post(`${environement.baseUrl}/api/v1/cart`, { "productId": p_id }, { headers: this.UserToken })
  }

  RemovespecificcartItem(p_id: string): Observable<any> {
    return this._HttpClient.delete(`${environement.baseUrl}/api/v1/cart/${p_id}`, { headers: this.UserToken })
  }

  Clearusercart(): Observable<any> {
    return this._HttpClient.delete(`${environement.baseUrl}/api/v1/cart`, { headers: this.UserToken })
  }

  UpdateCartProductQuantity(p_id: string, count: number): Observable<any> {
    return this._HttpClient.put(`${environement.baseUrl}/api/v1/cart/${p_id}`, { "count": count }, { headers: this.UserToken })
  }
}