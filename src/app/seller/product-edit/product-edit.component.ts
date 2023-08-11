import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { Product } from 'src/app/interfaces/product';
import { CategoryService } from 'src/app/services/category.service';
import { FileService } from 'src/app/services/file.service';
import { SellerService } from 'src/app/services/seller.service';
import { UtilService } from 'src/app/services/util.service';

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

  categories: Category[] = [];

  constructor(
    private sellerService: SellerService,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private util: UtilService,
    private fileService: FileService
  ) { }


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
    });

    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  updateProduct(product: Product): void {
    product.id = this.id;
    product.thumbnailUrl = this.thumbnailUrl;
    this.sellerService.updateProduct(product).subscribe((response) => {
      this.util.toastify(response, "Product Updated");
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
