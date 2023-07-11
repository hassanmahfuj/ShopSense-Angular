import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Seller } from 'src/app/interfaces/seller';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  constructor(private sellerService: SellerService, private router: Router) {

    if (localStorage.getItem('seller-token') != null) {
      this.router.navigate(['seller']);
    }
  }

  onSellerLogin(seller: Seller): void {
    this.sellerService.sellerLogin(seller).subscribe(
      (seller: Seller) => {
        if (seller != null) {
          localStorage.setItem('seller-token', JSON.stringify(seller));
          this.router.navigate(['seller']);
        }
      }
    )
  }
}
