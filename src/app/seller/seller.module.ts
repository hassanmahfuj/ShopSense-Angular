import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from './seller.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductEditComponent } from './product-edit/product-edit.component';


@NgModule({
  declarations: [
    SellerComponent,
    AuthComponent,
    DashboardComponent,
    ProductsComponent,
    ProductAddComponent,
    ProductEditComponent
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class SellerModule { }
