import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  id: any;
  title: any;
  thumbnailUrl: any;
  description: any;
  regularPrice: any;
  salePrice: any;
  category: any;
  stockStatus: any;
  stockCount: any;

  constructor(private sellerService: SellerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.sellerService.getProduct(this.id).subscribe((p) => {
      this.title = p.title;
      this.thumbnailUrl = p.thumbnailUrl;
      this.description = p.description;
      this.regularPrice = p.regularPrice;
      this.salePrice = p.salePrice;
      this.category = p.category;
      this.stockStatus = p.stockStatus;
      this.stockCount = p.stockCount;
    })
  }

  updateProduct(product: Product): void {
    product.id = this.id;
    this.sellerService.updateProduct(product).subscribe((response) => {
      if (response) {
        alert("Product Updated")
      } else {
        alert("Something went wrong")
      }
    });
  }
}
