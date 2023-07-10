import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerComponent } from './seller.component';
import { AuthGuard } from './auth.guard';
import { AuthComponent } from './auth/auth.component';
import { ProductsComponent } from './products/products.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductAddComponent } from './product-add/product-add.component';

const routes: Routes = [
  {
    path: "", component: SellerComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: "", component: DashboardComponent },
      { path: "products", component: ProductsComponent },
      { path: "products/add", component: ProductAddComponent }
    ]
  },
  { path: "auth", component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
