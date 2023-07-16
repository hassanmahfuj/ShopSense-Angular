import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/interfaces/cart-item';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  customerName: string = '';
  searchQuery: string = '';

  cartItems: CartItem[] = [];
  cartTotal: number = 0;

  private updateCart: Subscription;

  constructor(private customerService: CustomerService, private router: Router) {
    this.customerName = customerService.getCustomer().name;

    this.updateCart = customerService.parentMethodCalled$.subscribe(data => {
      this.getCartItems();
    });
  }

  ngOnInit(): void {
    this.getCartItems();
  }

  ngOnDestroy(): void {
    this.updateCart.unsubscribe();
  }

  search(): void {
    this.router.navigate(['search']);
  }

  getCartItems() {
    this.customerService.getCartItems().subscribe((response) => {
      this.cartItems = response;
      this.cartTotal = 0;
      for (let item of this.cartItems) {
        this.cartTotal += item.subTotal;
      }
    });
  }
}
