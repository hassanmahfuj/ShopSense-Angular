import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/interfaces/cart-item';
import { Product } from 'src/app/interfaces/product';
import { Wishlist } from 'src/app/interfaces/wishlist';
import { CustomerService } from 'src/app/services/customer.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Product = {
    id: 0,
    title: '',
    thumbnailUrl: '',
    description: '',
    regularPrice: 0,
    salePrice: 0,
    category: '',
    stockStatus: '',
    stockCount: 0,
    sellerId: 0,
    storeName: '',
    status: ''
  };

  quantity: number = 1;

  isWishlisted: boolean = false;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private util: UtilService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.customerService.getProduct(id).subscribe((response) => {
      this.product = response;
      this.getIsWishlisted();
    });
  }

  quantityChange(decrease: boolean): void {
    if (decrease && this.quantity > 1) {
      this.quantity--;
    } else if (!decrease) {
      this.quantity++;
    }
  }

  addToCart() {
    let cartItem: CartItem = {
      customerId: this.customerService.getCustomer().id,
      productId: this.product.id,
      sellerId: this.product.sellerId,
      storeName: this.product.storeName,
      productName: this.product.title,
      productThumbnailUrl: this.product.thumbnailUrl,
      productUnitPrice: this.product.salePrice,
      productQuantity: this.quantity,
      subTotal: this.product.salePrice * this.quantity,
    };
    this.customerService.addToCart(cartItem).subscribe((response) => {
      this.util.toastify(response != null, "Added to cart");
      this.customerService.toUpdateCart();
    });
  }

  buyNow() {
    this.addToCart();
    this.router.navigate(['cart'])
  }

  toggleWishlist() {
    let w: Wishlist = {
      customerId: this.customerService.getCustomer().id,
      productId: this.product.id
    }
    if (this.isWishlisted) {
      this.customerService.removeFromWishlist(w).subscribe(res => {
        this.util.toastify(res, "Removed from wishlist.");
        this.getIsWishlisted();
      });
    } else {
      this.customerService.addToWishlist(w).subscribe(res => {
        this.util.toastify(res, "Added to wishlist.");
        this.getIsWishlisted();
      });
    }
  }

  getIsWishlisted() {
    let w: Wishlist = {
      customerId: this.customerService.getCustomer().id,
      productId: this.product.id
    }
    this.customerService.isWishlisted(w).subscribe(res => {
      this.isWishlisted = res;
    });
  }
}
