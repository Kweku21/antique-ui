import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ProductBidRequest} from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
  ) { }

  private apiServiceUrl  = environment.apiBaseUrl;

  public getAllProducts(): Observable<object>{
    return this.http.get<object>(`${this.apiServiceUrl}products/`);
  }

  public loadProductsFromUrl(url: string): Observable<object>{
    return this.http.get<object>(url);
  }

  public searchProducts(searchKeyWord: string): Observable<object>{
    return this.http.get<object>(`${this.apiServiceUrl}products/?search=${searchKeyWord}`);
  }

  public filterProducts(filterKeyWord: string): Observable<object>{
    return this.http.get<object>(`${this.apiServiceUrl}products/?ordering=${filterKeyWord}`);
  }

  public getSingleProduct(id: string): Observable<object>{
    return this.http.get<object>(`${this.apiServiceUrl}products/${id}/`);
  }

  public makeProductBid(productBidRequest: ProductBidRequest): Observable<object>{
    return this.http.post<object>(`${this.apiServiceUrl}products/biding/`, productBidRequest);
  }

}
