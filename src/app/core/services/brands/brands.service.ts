import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environement } from '../../../shard/environement/environement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

   constructor(private _HttpClient:HttpClient) { }
  getAllBrands():Observable<any> {
    return this._HttpClient.get(`${environement.baseUrl}/api/v1/brands`);
  }

  getSpacificBrand(b_id:string):Observable<any>{
    return this._HttpClient.get(`${environement.baseUrl}/api/v1/brands/${b_id}`);
  }
}
