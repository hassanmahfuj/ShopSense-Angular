import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { AuthComponent } from './auth/auth.component';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { AddressesComponent } from './addresses/addresses.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { TrackOrderComponent } from './track-order/track-order.component';
import { WishlistComponent } from './wishlist/wishlist.component';


@NgModule({
  declarations: [
    CustomerComponent,
    AuthComponent,
    ProfileComponent,
    OrdersComponent,
    AddressesComponent,
    OrderDetailsComponent,
    TrackOrderComponent,
    WishlistComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class CustomerModule { }
