import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/interfaces/order';
import { SellerStat } from 'src/app/interfaces/seller-stat';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  orders: Order[] = [];
  stat: SellerStat = {};

  constructor(
    private sellerService: SellerService
  ) { }

  ngOnInit(): void {
    this.sellerService.getOrders(this.sellerService.getSellerToken().id).subscribe((orders) => {
      this.orders = orders;
    });
    this.sellerService.getStat().subscribe((s) => {
      this.stat = s;
    });
  }
}
