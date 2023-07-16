import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product'
import { SellerService } from 'src/app/services/seller.service';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import { UtilService } from 'src/app/services/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private sellerService: SellerService,
    private categoryService: CategoryService,
    private util: UtilService,
    private router: Router
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
        this.util.toastify(true, "Product Added Successfully");
        this.router.navigate(['products']);
      } else {
        this.util.toastify(false);
      }
    });
  }
}
