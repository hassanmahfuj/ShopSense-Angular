import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { OrderDetails } from 'src/app/interfaces/order-details';
import { RefundDetails } from 'src/app/interfaces/refund-details';
import { CustomerService } from 'src/app/services/customer.service';
import { RefundService } from 'src/app/services/refund.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orderId: number = 0;
  order!: Order;
  refundEligible: boolean = false;
  refundDetails: RefundDetails = {
    refundId: 0,
    orderId: 0,
    orderDetailsId: 0,
    sellerId: 0,
    reason: '',
    bankNumber: '',
    bankName: '',
    amount: 0,
    status: ''
  };
  selectedOrderDetailsId: number = 0;
  selectedSellerId: number = 0;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
    private util: UtilService,
    private refundService: RefundService
  ) { }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.params['id'];
    this.getOrderDetails();
  }

  getOrderDetails() {
    this.customerService.getOrder(this.orderId).subscribe((order) => {
      this.order = order;
      if (this.util.calcDateDiffInDays(order.orderDate, new Date().toISOString()) < 7) {
        this.refundEligible = true;
      }
    });
  }

  trackOrder(orderItem: OrderDetails) {
    // this.router.navigate(['customer/track'], { state: { data: orderItem } });
    this.router.navigate(['customer/track', orderItem.id]);
  }

  setRefundDetails(orderDetailsId: any, sellerId: any) {
    this.selectedOrderDetailsId = orderDetailsId;
    this.selectedSellerId = sellerId;
  }

  onRefund() {
    this.refundDetails.orderId = this.order.id || 0;
    this.refundDetails.orderDetailsId = this.selectedOrderDetailsId;
    this.refundDetails.sellerId = this.selectedSellerId;
    this.refundDetails.amount = this.order.orderTotal;
    console.log(this.refundDetails);
    this.refundService.createRefund(this.refundDetails).subscribe(res => {
      if (res != null) {
        this.util.toastify(true, "Your refund initiated");
        this.getOrderDetails();
      } else {
        this.util.toastify(false);
      }
    });
  }
}
