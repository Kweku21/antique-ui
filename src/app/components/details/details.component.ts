import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Product, ProductBidRequest} from '../../models/Product';
import {ResponseMessage} from '../../models/ResponseMessage';
import {ProductService} from '../../services/product.service';
import {ErrorService} from '../../services/error.service';
import {ActivatedRoute} from '@angular/router';
import {LoginService} from '../../services/login.service';
import {User, UserAutoBidConfigRequest} from '../../models/User';
import {StorageService} from '../../services/storage.service';
import {NgForm} from '@angular/forms';
import * as $ from 'jquery';
import {UsersService} from '../../services/users.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  public product: Product;
  public responseMessage: ResponseMessage;
  public user: User;

  constructor(
    private productService: ProductService,
    private errorService: ErrorService,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private storageService: StorageService,
    private userService: UsersService,
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      this.getProduct(id);
    });

    // Get user
    this.user = this.storageService.getUser();
  }

  ngOnInit(): void {
  }

  public getProduct(id: string): void{

    this.productService.getSingleProduct(id).subscribe(
      (response: any) => {

        this.product = response;

        console.log(this.product.close_bid_date);

      },
      (error: HttpErrorResponse) => {
        this.responseMessage = this.errorService.requestError(error.error, error.status);
        this.errorService.alertMessage('Error', this.responseMessage.message, 'error');
      }
    );
  }

  public loginUser(): void{

    this.loginService.loginUser().subscribe(
      (response: any) => {
        this.storageService.setUser(response.user);
        this.storageService.setBidConfig(response.bid_config);

        this.user = this.storageService.getUser();


      },
      (error: HttpErrorResponse) => {
        this.errorService.alertMessage('Error', 'Unable to login', 'error');
      }
    );

  }

  public productBid(productBidForm: NgForm): void{
    const formRequest: ProductBidRequest = {
      product: this.product.id.toString(),
      user: this.user,
      amount: productBidForm.value.amount,
      auto_bid: productBidForm.value.auto_bid
    };

    this.productService.makeProductBid(formRequest).subscribe(
      (response: any) => {

        alert('Successfully completed bid for product');

        productBidForm.resetForm();


      },
      (error: HttpErrorResponse) => {
        this.responseMessage = this.errorService.requestError(error.error, error.status);
        this.errorService.alertMessage('Error', this.responseMessage.message, 'error');
      }
    );
  }

  public checkAutoBid(): void {
    const bidConfig = this.storageService.getUserBidConfig();
    if (bidConfig.max_bid_amount == null){
      $('#bidConfigModal').click();
    }
  }

  public submitAutoBid(autoBidForm: NgForm): void {
    const configRequest: UserAutoBidConfigRequest = {
      user: this.user,
      amount: autoBidForm.value.amount,
    };

    this.userService.submitAutoBidConfig(configRequest).subscribe(
      (response: any) => {

        alert('Successfully completed configuration for auto bid');

        autoBidForm.resetForm();

      },
      (error: HttpErrorResponse) => {
        this.responseMessage = this.errorService.requestError(error.error, error.status);
        this.errorService.alertMessage('Error', this.responseMessage.message, 'error');
      }
    );

    $('#closeConfigModal').click();
  }

  public checkCloseDate(): boolean {
    // tslint:disable-next-line:variable-name
    const close_date = new Date(this.product.close_bid_date);
    const today = new Date();

    return close_date > today;
  }

  public getProductCloseDate(): Date{
    return new Date(this.product.close_bid_date);
  }
}
