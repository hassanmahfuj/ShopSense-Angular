import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-orders-shipped',
  templateUrl: './orders-shipped.component.html',
  styleUrls: ['./orders-shipped.component.css']
})
export class OrdersShippedComponent {
  orders: Order[] = [];

  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.adminService.getShippedOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }

  showDetails(id: any) {
    this.router.navigate(['admin/order', id]);
  }
}
