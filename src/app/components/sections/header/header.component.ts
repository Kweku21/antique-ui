import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {StorageService} from '../../../services/storage.service';
import {LoginService} from '../../../services/login.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ResponseMessage} from '../../../models/ResponseMessage';
import {User} from '../../../models/User';
import {ErrorService} from '../../../services/error.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public responseMessage: ResponseMessage;
  public user: User;

  constructor(
    private storageService: StorageService,
    private loginService: LoginService,
    private errorService: ErrorService,
  ) {
    this.user = this.storageService.getUser();
  }

  ngOnInit(): void {
    this.jqueryStarter();
  }

  public jqueryStarter(): void {
    let posWrapHeader;
    const headerDesktop = $('.container-menu-desktop');
    const wrapMenu = $('.wrap-menu-desktop');

    if ($('.top-bar').length > 0) {
      posWrapHeader = $('.top-bar').height();
    }
    else {
      posWrapHeader = 0;
    }

    $(window).on('scroll', function(){
      if ($(this).scrollTop() > posWrapHeader) {
        $(headerDesktop).addClass('fix-menu-desktop');
        $(wrapMenu).css('top', 0);
      }
      else {
        $(headerDesktop).removeClass('fix-menu-desktop');
        $(wrapMenu).css('top', posWrapHeader - $(this).scrollTop());
      }
    });

    $('.js-show-filter').on('click', function(){
      $(this).toggleClass('show-filter');
      $('.panel-filter').slideToggle(400);
    });
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

}
