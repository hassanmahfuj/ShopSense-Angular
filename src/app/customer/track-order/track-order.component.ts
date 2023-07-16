import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetails } from 'src/app/interfaces/order-details';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css']
})
export class TrackOrderComponent implements OnInit {

  item!: OrderDetails;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.customerService.trackOrder(id).subscribe((order) => {
      this.item = order;
    });
    // this.item = history.state.data;
  }

}
