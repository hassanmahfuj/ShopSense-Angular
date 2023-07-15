import { Component, OnInit } from '@angular/core';
import { OrderDetails } from 'src/app/interfaces/order-details';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css']
})
export class TrackOrderComponent implements OnInit {

  item!: OrderDetails;

  ngOnInit(): void {
    this.item = history.state.data;
  }

}
