import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(
    private sellerService: SellerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sellerService.getOrders(this.sellerService.getSellerToken().id).subscribe((orders) => {
      this.orders = orders;
    });
  }

  showDetails(id: any) {
    this.router.navigate(['seller/order', id]);
  }
}
