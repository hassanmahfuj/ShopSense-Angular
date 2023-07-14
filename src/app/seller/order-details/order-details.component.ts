import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { OrderDetails } from 'src/app/interfaces/order-details';
import { SellerService } from 'src/app/services/seller.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {

  order: any;
  orderDetails: OrderDetails[] = [];

  constructor(
    private sellerService: SellerService,
    private router: Router,
    private route: ActivatedRoute,
    private util: UtilService
  ) { }

  ngOnInit(): void {
    const orderId = this.route.snapshot.params["id"];
    this.sellerService.getOrder(orderId, this.sellerService.getSeller().id).subscribe((order) => {
      this.order = order;
      for (const item of order.orderDetails) {
        this.orderDetails.push(item);
      }
    });
  }

  onComplete(pos: number) {
    let o: OrderDetails = this.orderDetails[pos];
    o.status = 'Completed';
    this.sellerService.updateOrder(o).subscribe((success) => {
      this.util.toastify(success, "Order Completed");
    });
  }

  onCancel(pos: number) {
    let o: OrderDetails = this.orderDetails[pos];
    o.status = 'Canceled';
    this.sellerService.updateOrder(o).subscribe((success) => {
      this.util.toastify(success, "Order Canceled");
    });
  }
}
