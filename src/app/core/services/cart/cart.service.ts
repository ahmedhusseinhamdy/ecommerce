import { BehaviorSubject, Observable, EMPTY } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environement } from '../../../shard/environement/environement';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartcount: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(
    private _HttpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  private getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem('token');
    }
    return null;
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token || ''}`
    });
  }

  /**
   * Get the user's cart
   */
  GetLoggedUserCart(): Observable<any> {
    const token = this.getToken();
    if (!token) return EMPTY;
    return this._HttpClient.get(
      `${environement.baseUrl}/api/v1/cart`,
      { headers: this.getAuthHeaders() }
    );
  }

  /**
   * Add a product to the cart
   */
  addProductCart(p_id: string): Observable<any> {
    const token = this.getToken();
    if (!token) return EMPTY;
    return this._HttpClient.post(
      `${environement.baseUrl}/api/v1/cart`,
      { productId: p_id },
      { headers: this.getAuthHeaders() }
    );
  }

  /**
   * Remove a specific product from the cart
   */
  RemoveSpecificCartItem(p_id: string): Observable<any> {
    const token = this.getToken();
    if (!token) return EMPTY;
    return this._HttpClient.delete(
      `${environement.baseUrl}/api/v1/cart/${p_id}`,
      { headers: this.getAuthHeaders() }
    );
  }

  /**
   * Update quantity of a specific product
   */
  Updatecartproductquantity(p_id: string, count: number): Observable<any> {
    const token = this.getToken();
    if (!token) return EMPTY;
    return this._HttpClient.put(
      `${environement.baseUrl}/api/v1/cart/${p_id}`,
      { count },
      { headers: this.getAuthHeaders() }
    );
  }

  /**
   * Clear the user's cart
   */
  Clearusercart(): Observable<any> {
    const token = this.getToken();
    if (!token) return EMPTY;
    return this._HttpClient.delete(
      `${environement.baseUrl}/api/v1/cart`,
      { headers: this.getAuthHeaders() }
    );
  }
}
