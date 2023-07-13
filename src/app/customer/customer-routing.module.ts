import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { AddressesComponent } from './addresses/addresses.component';

const routes: Routes = [
  {
    path: "", component: CustomerComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: "", component: ProfileComponent },
      { path: "orders", component: OrdersComponent },
      { path: "addresses", component: AddressesComponent }
    ]
  },
  { path: "auth", component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }