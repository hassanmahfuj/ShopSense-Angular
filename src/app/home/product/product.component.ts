import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/interfaces/cart-item';
import { Product } from 'src/app/interfaces/product';
import { Review } from 'src/app/interfaces/review';
import { Wishlist } from 'src/app/interfaces/wishlist';
import { CustomerService } from 'src/app/services/customer.service';
import { FileService } from 'src/app/services/file.service';
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

  productId: number = 0;
  quantity: number = 1;

  isWishlisted: boolean = false;

  isProductPurchased: boolean = false;
  reviewStars: number = 3;
  reviewComment: string = '';
  reviews: Review[] = [];

  avgStar: number = 0;
  host: string = this.fileService.host;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private util: UtilService,
    private router: Router,
    private fileService: FileService
  ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.customerService.getProduct(this.productId).subscribe((response) => {
      this.product = response;
      this.getIsWishlisted();
    });
    this.customerService.isProductPurchased(this.productId).subscribe(res => {
      this.isProductPurchased = res;
    });
    this.getReviews();
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

  setReviewStars(star: number) {
    this.reviewStars = star;
  }

  getReviews() {
    this.customerService.getReviews(this.productId).subscribe(res => {
      this.reviews = res;

      // generating avg star
      let totalStar = 0;
      let givenStar = 0;
      for (let r of this.reviews) {
        totalStar += 5;
        givenStar += r.star;
      }
      this.avgStar = givenStar / totalStar * 100;
    });
  }

  postReview() {
    let r: Review = {
      reviewId: 0,
      customerId: this.customerService.getCustomer().id,
      customerName: this.customerService.getCustomer().name,
      productId: this.productId,
      star: this.reviewStars,
      comment: this.reviewComment
    }
    this.customerService.postReview(r).subscribe(res => {
      this.util.toastify(res, "Review Posted");
      this.getReviews();
      this.reviewStars = 3;
      this.reviewComment = '';
    });
  }
}
