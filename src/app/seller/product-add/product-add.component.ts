import { Component } from '@angular/core';
import { Product } from '../../interfaces/product'
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {

  constructor(private sellerService: SellerService) { }

  saveProduct(product: Product): void {
    product.sellerId = this.sellerService.getSeller().id;
    product.status = 'Pending';
    this.sellerService.createProduct(product).subscribe((response) => {
      if (response != null) {
        alert("Product Added")
      } else {
        alert("Something went wrong")
      }
    });
  }
}
