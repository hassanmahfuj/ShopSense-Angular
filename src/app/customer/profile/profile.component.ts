import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  name: any;
  email: any;
  address: any;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.name = this.customerService.getCustomer().name;
    this.email = this.customerService.getCustomer().email;
    this.address = this.customerService.getCustomer().address;
  }


}
