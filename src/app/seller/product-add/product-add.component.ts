import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product'
import { SellerService } from 'src/app/services/seller.service';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import { UtilService } from 'src/app/services/util.service';
import { Router } from '@angular/router';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  categories: Category[] = [];
  thumbnailUrl: string = '';

  constructor(
    private sellerService: SellerService,
    private categoryService: CategoryService,
    private util: UtilService,
    private router: Router,
    private fileService: FileService
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  saveProduct(product: Product): void {
    product.sellerId = this.sellerService.getSellerToken().id;
    product.storeName = this.sellerService.getSellerToken().storeName;
    product.status = 'Pending';
    product.thumbnailUrl = this.thumbnailUrl;
    this.sellerService.createProduct(product).subscribe((response) => {
      if (response != null) {
        this.util.toastify(true, "Product Added Successfully");
        this.router.navigate(['seller/products']);
      } else {
        this.util.toastify(false);
      }
    });
  }

  onSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      this.fileService.uploadFile(formData).subscribe(res => {
        if (res.status == "success") {
          this.util.toastify(true, "Image Uploaded Successfully");
          this.thumbnailUrl = res.fileUrl;
        } else {
          this.util.toastify(false);
        }
      });
    }
  }
}
