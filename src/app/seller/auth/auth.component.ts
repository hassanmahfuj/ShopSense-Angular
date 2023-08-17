import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRequest } from 'src/app/interfaces/auth-request';
import { AuthResponse } from 'src/app/interfaces/auth-response';
import { Seller } from 'src/app/interfaces/seller';
import { SellerService } from 'src/app/services/seller.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  constructor(
    private sellerService: SellerService, 
    private router: Router,
    private util: UtilService) {

    if (localStorage.getItem('seller-token') != null) {
      this.router.navigate(['seller']);
    }
  }

  onSellerLogin(seller: Seller): void {
    let req: AuthRequest = {
      email: seller.email,
      password: seller.password
    }
    this.sellerService.sellerLogin(req).subscribe(
      (res: AuthResponse) => {
        if (res.status == "success") {
          localStorage.setItem('seller-jwt', res.token);
          localStorage.setItem('seller-token', JSON.stringify(res.user));
          this.router.navigate(['seller']);
          this.util.toastify(true, "Successfully logged in")
        } else {
          this.util.toastify(false)
        }
      }
    )
  }

  onSellerSignup(seller: Seller): void {
    seller.role = "SELLER";
    this.sellerService.sellerSignup(seller).subscribe(
      (seller: Seller) => {
        if (seller != null) {
          localStorage.setItem('seller-token', JSON.stringify(seller));
          this.router.navigate(['seller']);
          this.util.toastify(true, "Registered successfully and logged in")
        } else {
          this.util.toastify(false)
        }
      }
    )
  }
}
