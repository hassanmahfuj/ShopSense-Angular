import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product'
import { SellerService } from 'src/app/services/seller.service';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private sellerService: SellerService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  saveProduct(product: Product): void {
    product.sellerId = this.sellerService.getSeller().id;
    product.storeName = this.sellerService.getSeller().storeName;
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
