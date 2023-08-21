import { Component, OnInit } from '@angular/core';
import { RefundDetails } from 'src/app/interfaces/refund-details';
import { RefundService } from 'src/app/services/refund.service';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.css']
})
export class RefundComponent implements OnInit {
  refundDetails: RefundDetails[] = [];

  constructor(
    private refundService: RefundService
  ) { }

  ngOnInit(): void {
    this.refundService.getSellerRefund().subscribe(res => {
      this.refundDetails = res;
    });
  }


}
