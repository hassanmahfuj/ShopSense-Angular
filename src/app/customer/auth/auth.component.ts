import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRequest } from 'src/app/interfaces/auth-request';
import { AuthResponse } from 'src/app/interfaces/auth-response';
import { Customer } from 'src/app/interfaces/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  signIn: boolean = true;

  constructor(
    private customerService: CustomerService,
     private router: Router,
     private util: UtilService
     ) {

    if (localStorage.getItem('customer-token') != null) {
      this.router.navigate(['customer']);
    }
  }

  onCustomerLogin(customer: Customer): void {
    let req: AuthRequest = {
      email: customer.email,
      password: customer.password
    }
    this.customerService.customerLogin(req).subscribe(
      (res: AuthResponse) => {
        if (res.status == "success") {
          localStorage.setItem('customer-jwt', res.token);
          localStorage.setItem('customer-token', JSON.stringify(res.user));
          this.router.navigate(['customer']);
          this.util.toastify(true, "Successfully logged in");
        } else {
          this.util.toastify(false);
        }
      }
    )
  }

  onCustomerSignup(customer: Customer): void {
    customer.role = "CUSTOMER";
    this.customerService.customerSignup(customer).subscribe(
      (customer: Customer) => {
        if (customer != null) {
          localStorage.setItem('customer-token', JSON.stringify(customer));
          this.router.navigate(['customer']);
          this.util.toastify(true, "Registered successfully and logged in");
        } else {
          this.util.toastify(false);
        }
      }
    )
  }

  signInToggle() {
    this.signIn = !this.signIn;
  }
}
