import { Component } from '@angular/core';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {

  storeName: string = '';
  officeAddress: string = '';

  constructor(
    private sellerService: SellerService
  ) {
    this.storeName = sellerService.getSeller().storeName;
    this.officeAddress = sellerService.getSeller().officeAddress;
  }
}
