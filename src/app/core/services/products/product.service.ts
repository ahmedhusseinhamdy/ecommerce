import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environement } from '../../../shard/environement/environement';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly _HttpClient = inject(HttpClient)

  constructor() { }

  getAllproducts(): Observable<any> {
    return this._HttpClient.get(`${environement.baseUrl}/api/v1/products`)
  }
  getSpecificProducts(id: string): Observable<any> {
    return this._HttpClient.get(`${environement.baseUrl}/api/v1/products/${id}`)
  }

}
