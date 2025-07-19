import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environement } from '../../../shard/environement/environement';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _HttpClient: HttpClient) { }

  getAllCategories(): Observable<any> {
    return this._HttpClient.get(`${environement.baseUrl}/api/v1/categories`)
  }
  getSpacificCategory(categori_id: string): Observable<any> {
    return this._HttpClient.get(`${environement.baseUrl}/api/v1/categories/${categori_id}`)
  }

}
