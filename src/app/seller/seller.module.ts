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
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { StoreComponent } from './store/store.component';
import { ReportSalesComponent } from './report-sales/report-sales.component';
import { RefundComponent } from './refund/refund.component';
import { ReportComponent } from './report/report.component';


@NgModule({
  declarations: [
    SellerComponent,
    AuthComponent,
    DashboardComponent,
    ProductsComponent,
    ProductAddComponent,
    ProductEditComponent,
    OrdersComponent,
    OrderDetailsComponent,
    WithdrawComponent,
    StoreComponent,
    ReportSalesComponent,
    RefundComponent,
    ReportComponent
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class SellerModule { }
