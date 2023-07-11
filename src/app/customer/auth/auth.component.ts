import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  signIn: boolean = true;

  constructor(private customerService: CustomerService, private router: Router) {

    if (localStorage.getItem('customer-token') != null) {
      this.router.navigate(['customer']);
    }
  }

  onCustomerLogin(customer: Customer): void {
    this.customerService.customerLogin(customer).subscribe(
      (customer: Customer) => {
        if (customer != null) {
          localStorage.setItem('customer-token', JSON.stringify(customer));
          this.router.navigate(['customer']);
        }
      }
    )
  }

  signInToggle() {
    this.signIn = !this.signIn;
  }
}
