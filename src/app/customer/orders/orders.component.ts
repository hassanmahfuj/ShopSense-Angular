import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.customerService.getOrders(this.customerService.getCustomer().id).subscribe((orders) => {
      this.orders = orders;
    });
  }

  showDetails(id: any) {
    this.router.navigate(['customer/order', id]);
  }

  showInvoice(id: any) {
    this.router.navigate(['../invoice', id]);
  }
}
