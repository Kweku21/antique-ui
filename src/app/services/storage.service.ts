import { Injectable } from '@angular/core';
import {User, UserBidConfig} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public user: User;
  public bidConfig: UserBidConfig;

  constructor() { }

  public setUser(user: User): void{
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(): any{
    return  JSON.parse(localStorage.getItem('user'));
  }

  public setBidConfig(bidConfig: UserBidConfig): void{
    localStorage.setItem('bid_config', JSON.stringify(bidConfig));
  }

  public getUserBidConfig(): any{
    return  JSON.parse(localStorage.getItem('bid_config'));
  }
}
