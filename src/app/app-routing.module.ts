import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { HomeModule } from './home/home.module';
import { CustomerModule } from './customer/customer.module';
import { SellerModule } from './seller/seller.module';
import { AdminModule } from './admin/admin.module';

const routes: Routes = [
  { path: "", loadChildren: () => HomeModule},
  { path: 'customer', loadChildren: () => CustomerModule },
  { path: 'seller', loadChildren: () => SellerModule },
  { path: 'admin', loadChildren: () => AdminModule },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
