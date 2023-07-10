import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from './seller.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SellerComponent,
    AuthComponent,
    DashboardComponent,
    ProductsComponent,
    ProductAddComponent
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    FormsModule
  ]
})
export class SellerModule { }
