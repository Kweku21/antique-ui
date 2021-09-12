import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StorageService} from './storage.service';
import {ErrorService} from './error.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private errorService: ErrorService,
  ) { }

  private apiServiceUrl  = environment.apiBaseUrl;

  public loginUser(): Observable<object>{
    return this.http.post<object>(`${this.apiServiceUrl}users/login/`, {})
  }

  public checkUserLoginStatus(): boolean{
    return !!this.storageService.getUser();
  }
}
