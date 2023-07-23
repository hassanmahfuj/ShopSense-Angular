import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { AdminService } from 'src/app/services/admin.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(
    private adminService: AdminService,
    private util: UtilService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  products: Product[] = [];

  getAllProducts() {
    this.adminService.getAllProducts().subscribe((p) => {
      this.products = p;
    });
  }

  updateProduct(p: Product, s: string) {
    p.status = s;
    this.adminService.updateProduct(p).subscribe((p) => {
      if(p != null) {
        this.util.toastify(true, "Product Updated");
      } else {
        this.util.toastify(false);
      }
    });
  }

}
