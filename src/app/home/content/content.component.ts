import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { CustomerService } from 'src/app/services/customer.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  products: Product[] = [];
  host: string = this.fileService.host;

  constructor(
    private customerService: CustomerService, 
    private router: Router,
    private fileService: FileService
    ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.customerService.getProducts().subscribe((response) => {
      this.products = response;
      console.log(response);
      
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
