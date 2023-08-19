import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private toast: NgToastService) { }

  toastify(success: boolean, msg: string = 'Task completed', errmsg: string = 'Something went wrong') {
    if (success) {
      this.toast.success({ detail: "SUCCESS", summary: msg, duration: 3500, position: 'topCenter' });
    } else {
      this.toast.error({ detail: "ERROR", summary: errmsg, duration: 3500, position: 'topCenter' });
    }
  }

  calcDateDiffInDays(dateStr1: string, dateStr2: string): number {
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);

    const timeDifference = Math.abs(date2.getTime() - date1.getTime());
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    return daysDifference;
  }
}
