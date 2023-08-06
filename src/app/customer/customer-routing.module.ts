import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { AddressesComponent } from './addresses/addresses.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { TrackOrderComponent } from './track-order/track-order.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {
    path: "", component: CustomerComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: ProfileComponent },
      { path: "orders", component: OrdersComponent },
      { path: "order/:id", component: OrderDetailsComponent },
      { path: "track/:id", component: TrackOrderComponent },
      { path: "addresses", component: AddressesComponent },
      { path: "wishlist", component: WishlistComponent }
    ]
  },
  { path: "auth", component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
