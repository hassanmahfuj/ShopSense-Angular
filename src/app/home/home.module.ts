import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home.component';
import { ProductComponent } from './product/product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { InvoiceComponent } from './invoice/invoice.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    ProductComponent,
    CheckoutComponent,
    CartComponent,
    SearchComponent,
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule
  ]
})
export class HomeModule { }
