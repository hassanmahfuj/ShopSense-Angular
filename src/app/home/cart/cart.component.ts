import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/interfaces/cart-item';
import { CustomerService } from 'src/app/services/customer.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartItems: CartItem[] = [];
  cartTotal: number = 0;

  constructor(private customerService: CustomerService, private util: UtilService) { }

  ngOnInit(): void {
    this.getCartItems();
  }

  quantityChange(decrease: boolean, item: CartItem): void {
    if (decrease && item.productQuantity > 1) {
      item.productQuantity--;
    } else if (!decrease) {
      item.productQuantity++;
    }
    item.subTotal = item.productUnitPrice * item.productQuantity;
    this.customerService.updateCart(item).subscribe((response) => {
      if (response) {
        this.getCartItems();
        this.customerService.toUpdateCart();
        this.util.toastify(response);
      } else {
        this.util.toastify(response);
      }
    });
  }

  onItemRemove(id: any) {
    this.customerService.removeFromCart(id).subscribe((response) => {
      this.getCartItems();
      this.util.toastify(response, "Removed from cart");
      this.customerService.toUpdateCart();
    })
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
