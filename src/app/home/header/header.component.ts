import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  customerName: string = '';
  searchQuery: string = '';

  constructor(private customerService: CustomerService, private router: Router) {
    this.customerName = customerService.getCustomer().name;
  }

  ngOnInit(): void {
    this.getCartItems();
  }

  search(): void {
    this.router.navigate(['search']);
  }

  getCartItems() {
    this.customerService.getCartItems().subscribe((response) => {
      console.log(response);
    });
  }
}
