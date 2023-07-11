import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  customerName: string = '';

  constructor(private router: Router, private customerService: CustomerService) {
    this.customerName = customerService.getCustomer().name;
  }

  onCustomerLogout(): void {
    localStorage.removeItem('customer-token');
    this.router.navigate(['customer/auth']);
  }
}
