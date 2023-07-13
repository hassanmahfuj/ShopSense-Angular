import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private toast: NgToastService) { }

  toastify(success: boolean, msg: string = 'Task completed') {
    if (success) {
      this.toast.success({ detail: "SUCCESS", summary: msg, duration: 3500, position: 'topCenter' });
    } else {
      this.toast.error({ detail: "ERROR", summary: 'Something went wrong', duration: 3500, position: 'topCenter' });
    }
  }
}
