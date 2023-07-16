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
      { path: "coupons", component: CouponsComponent }
    ]
  },
  { path: "auth", component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
