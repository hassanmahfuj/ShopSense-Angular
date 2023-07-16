import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { OrderDetails } from 'src/app/interfaces/order-details';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order!: Order;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let orderId = this.route.snapshot.params['id'];
    this.customerService.getOrder(orderId).subscribe((order) => {
      this.order = order;
    });
  }

  trackOrder(orderItem: OrderDetails) {
    // this.router.navigate(['customer/track'], { state: { data: orderItem } });
    this.router.navigate(['customer/track', orderItem.id]);
  }
}
