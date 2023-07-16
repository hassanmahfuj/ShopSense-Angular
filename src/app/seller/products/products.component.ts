import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { SellerService } from 'src/app/services/seller.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private sellerService: SellerService,
    private util: UtilService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.sellerService.getProducts().subscribe((response) => {
      this.products = response;
    });
  }

  onDelete(id: number) {
    let bool = confirm("Are you sure to delete?");
    if (bool) {
      this.sellerService.deleteProduct(id).subscribe((response) => {
        this.getProducts();
        this.util.toastify(response, "Product Deleted");
      });
    }
  }

}
