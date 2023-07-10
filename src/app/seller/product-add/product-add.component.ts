import { Component } from '@angular/core';
import { Product } from '../../interfaces/product'

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {

  saveProduct(product: Product): void {
    product.id = 33;
    console.log(product.id);
    console.log(product.title);

  }
}
