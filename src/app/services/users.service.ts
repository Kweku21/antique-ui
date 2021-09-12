import { Injectable } from '@angular/core';
import {ProductBidRequest} from '../models/Product';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserAutoBidConfigRequest} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
  ) { }

  private apiServiceUrl  = environment.apiBaseUrl;

  public submitAutoBidConfig(configRequest: UserAutoBidConfigRequest): Observable<object>{
    return this.http.post<object>(`${this.apiServiceUrl}users/auto-bid/configure/`, configRequest);
  }
}
