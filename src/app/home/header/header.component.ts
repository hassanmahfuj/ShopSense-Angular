import { Component } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  customerName: string = '';

  constructor(private customerService: CustomerService) {
    this.customerName = customerService.getCustomer().name;
  }
}
