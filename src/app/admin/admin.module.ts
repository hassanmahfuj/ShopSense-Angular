import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ProductsComponent } from './products/products.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import { SellersComponent } from './sellers/sellers.component';
import { CustomersComponent } from './customers/customers.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { CategoriesComponent } from './categories/categories.component';
import { CouponsComponent } from './coupons/coupons.component';


@NgModule({
  declarations: [
    AdminComponent,
    ProductsComponent,
    DashboardComponent,
    AuthComponent,
    SellersComponent,
    CustomersComponent,
    WithdrawComponent,
    CategoriesComponent,
    CouponsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
