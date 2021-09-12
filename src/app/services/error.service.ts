import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {ResponseMessage} from '../models/ResponseMessage';


@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  public requestError(error: string, status: number): ResponseMessage {
    let errorMessage = null;
    // console.log(status);
    if (status === 0){
      errorMessage = new ResponseMessage('Unable to connect, Check Internet connectivity', 'danger');
      // console.log(this.errorMessage);
    }else if (status === 401){
      errorMessage = new ResponseMessage('Unable to connect, Check Internet connectivity', 'danger');
    } else if (status === 500){
      errorMessage = new ResponseMessage('Internal Error, Unable to complete task', 'danger');
    }else {

      errorMessage = new ResponseMessage(error, 'danger');

    }
    return errorMessage;
  }

  public alertMessage(title: string, message: string, type: string): void{
    alert(message);
  }
}
