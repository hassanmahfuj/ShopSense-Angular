import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerComponent } from './seller.component';
import { AuthGuard } from './auth.guard';
import { AuthComponent } from './auth/auth.component';
import { ProductsComponent } from './products/products.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { StoreComponent } from './store/store.component';
import { ReportSalesComponent } from './report-sales/report-sales.component';
import { RefundComponent } from './refund/refund.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {
    path: "", component: SellerComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: "", component: DashboardComponent },
      { path: "products", component: ProductsComponent },
      { path: "product", component: ProductAddComponent },
      { path: "product/:id", component: ProductEditComponent },
      { path: "orders", component: OrdersComponent },
      { path: "order/:id", component: OrderDetailsComponent },
      { path: "withdraw", component: WithdrawComponent },
      { path: "store", component: StoreComponent },
      { path: "report/sales", component: ReportSalesComponent },
      { path: "refund", component: RefundComponent },
      { path: "report", component: ReportComponent },
    ]
  },
  { path: "auth", component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
