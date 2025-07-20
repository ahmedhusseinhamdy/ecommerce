import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environement } from '../../../shard/environement/environement';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  userToken: any

  constructor(private _HttpClient: HttpClient, @Inject(PLATFORM_ID) _PLATFORM_ID: any) {

    if (isPlatformBrowser(_PLATFORM_ID)) {
      this.userToken = { token: sessionStorage.getItem('token') };
    } else {
      this.userToken = {};
    }
  }


  checkOutSession(c_id: string, data: object): Observable<any> {
    return this._HttpClient.post(`${environement.baseUrl}/api/v1/orders/checkout-session/${c_id}?url=${environement.domain}`, { "shippingAddress": data }, { headers: this.userToken })
  }                                                                                           

    getUserOrders(userId:string):Observable<any>{
    return this._HttpClient.get(`${environement.baseUrl}/api/v1/orders/user/${userId}`)
  }
}
