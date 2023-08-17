import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { CustomerService } from 'src/app/services/customer.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchQuery: any;
  searchProducts: Product[] = [];
  host: string = this.fileService.host;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router,
    private fileService: FileService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'];
      this.getProducts();
    });
  }

  getProducts() {
    this.customerService.getSearchProducts(this.searchQuery).subscribe(res => {
      this.searchProducts = res;
      console.log(res);

    });
  }

  showProduct(id: number): void {
    this.router.navigate(['product/' + id]);
  }

  getDiscountPercentage(p: Product): string {
    const discountAmount = p.regularPrice - p.salePrice;
    const discountPercentage = (discountAmount / p.regularPrice) * 100;
    return '-' + discountPercentage.toFixed(0) + '%';
  }
}
