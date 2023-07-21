import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent {

  sellerName: string = '';

  constructor(private router: Router, private sellerService: SellerService) {
    this.sellerName = sellerService.getSellerToken().name;
  }

  onSellerLogout(): void {
    localStorage.removeItem('seller-token');
    this.router.navigate(['seller/auth']);
  }
}
