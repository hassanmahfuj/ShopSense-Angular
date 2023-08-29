import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from './auth.guard';
import { AuthComponent } from './auth/auth.component';
import { ProductsComponent } from './products/products.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SellersComponent } from './sellers/sellers.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { CustomersComponent } from './customers/customers.component';
import { CouponsComponent } from './coupons/coupons.component';
import { CategoriesComponent } from './categories/categories.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersShippedComponent } from './orders-shipped/orders-shipped.component';
import { CollectionPointsComponent } from './collection-points/collection-points.component';
import { ReportSalesComponent } from './report-sales/report-sales.component';
import { RefundComponent } from './refund/refund.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {
    path: "", component: AdminComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: "", component: DashboardComponent },
      { path: "products", component: ProductsComponent },
      { path: "sellers", component: SellersComponent },
      { path: "withdraw", component: WithdrawComponent },
      { path: "customers", component: CustomersComponent },
      { path: "categories", component: CategoriesComponent },
      { path: "coupons", component: CouponsComponent },
      { path: "orders", component: OrdersComponent },
      { path: "order/:id", component: OrderDetailsComponent },
      { path: "orders/shipped", component: OrdersShippedComponent },
      { path: "collection", component: CollectionPointsComponent },
      { path: "report/sales", component: ReportSalesComponent },
      { path: "refund", component: RefundComponent },
      { path: "report", component: ReportComponent }
    ]
  },
  { path: "auth", component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
