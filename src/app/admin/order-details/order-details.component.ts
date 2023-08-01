import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetails } from 'src/app/interfaces/order-details';
import { AdminService } from 'src/app/services/admin.service';
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
    private adminService: AdminService,
    private route: ActivatedRoute,
    private util: UtilService
  ) { }

  ngOnInit(): void {
    const orderId = this.route.snapshot.params["id"];
    this.adminService.getOrder(orderId).subscribe((order) => {
      this.order = order;
      for (const item of order.orderDetails) {
        this.orderDetails.push(item);
      }
    });
  }

  onStatusChange(pos: number, status: string) {
    let o: OrderDetails = this.orderDetails[pos];
    o.status = status;
    if(o.status == 'Delivered') {
      o.deliveryDate = new Date().toISOString();
    }
    this.adminService.updateOrder(o).subscribe((success) => {
      this.util.toastify(success, "Order " + status);
    });
  }
}
