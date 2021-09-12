import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Product} from '../../models/Product';
import {Pagination} from '../../models/Pagination';
import {ResponseMessage} from '../../models/ResponseMessage';
import {ErrorService} from '../../services/error.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public products: Product[];
  public responseMessage: ResponseMessage;
  public paginate: Pagination;

  constructor(
    private productService: ProductService,
    private errorService: ErrorService,
  ) {

  }

  ngOnInit(): void {

    this.getProducts();

  }

  public getProducts(): void {
    this.productService.getAllProducts().subscribe(
      (response: any) => {
        this.products = response.results;
        this.paginate = new Pagination(response.count, response.next, response.previous);
      },
      (error: HttpErrorResponse) => {
        this.responseMessage = this.errorService.requestError(error.error, error.status);
        this.errorService.alertMessage('Error', this.responseMessage.message, 'error');
      }
    );
  }

  public loadMoreProduct(): void{
    if (!!this.paginate.next){
      this.productService.loadProductsFromUrl(this.paginate.next).subscribe(
        (response: any) => {

          response.results.forEach(product => this.products.push(product));
          this.paginate = new Pagination(response.count, response.next, response.previous);

        },
        (error: HttpErrorResponse) => {
          this.responseMessage = this.errorService.requestError(error.error, error.status);
          this.errorService.alertMessage('Error', this.responseMessage.message, 'error');
        }
      );
    }

  }

  public searchProduct(event: any): void{

    const keyword = event.target.value;

    this.productService.searchProducts(keyword).subscribe(
      (response: any) => {

        this.products = response.results;
        this.paginate = new Pagination(response.count, response.next, response.previous);

      },
      (error: HttpErrorResponse) => {
        this.responseMessage = this.errorService.requestError(error.error, error.status);
        this.errorService.alertMessage('Error', this.responseMessage.message, 'error');
      }
    );
  }

  public filterProduct(filterKeyWord: string): void{

    this.productService.filterProducts(filterKeyWord).subscribe(
      (response: any) => {

        this.products = response.results;
        this.paginate = new Pagination(response.count, response.next, response.previous);

      },
      (error: HttpErrorResponse) => {
        this.responseMessage = this.errorService.requestError(error.error, error.status);
        this.errorService.alertMessage('Error', this.responseMessage.message, 'error');
      }
    );
  }

}
