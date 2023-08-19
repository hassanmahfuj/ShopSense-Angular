import { Component } from '@angular/core';
import { RefundDetails } from 'src/app/interfaces/refund-details';
import { RefundService } from 'src/app/services/refund.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.css']
})
export class RefundComponent {
  refundDetails: RefundDetails[] = [];

  constructor(
    private util: UtilService,
    private refundService: RefundService
  ) { }

  ngOnInit(): void {
    this.getAllRefund();
  }

  getAllRefund() {
    this.refundService.getAllRefund().subscribe(res => {
      this.refundDetails = res;
    });
  }

  onStatusChange(pos: number, status: string) {
    let a: RefundDetails = this.refundDetails[pos];
    a.status = status;
    this.refundService.updateRefund(a).subscribe(res => {
      if (res != null) {
        this.util.toastify(true, "Refund status updated");
      } else {
        this.util.toastify(false);
      }
    });
  }
}
