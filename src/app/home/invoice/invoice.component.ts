import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  customerName: string = '';
  customerEmail: string = '';
  customerAddress: string = '';

  invoiceId: number = 0;

  constructor(
    private customerService: CustomerService,
    private util: UtilService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.customerName = this.customerService.getCustomer().name;
    this.customerEmail = this.customerService.getCustomer().email;
    this.customerAddress = this.customerService.getCustomer().address;

    this.invoiceId = this.route.snapshot.params['id'];
    this.customerService.getOrder(this.invoiceId).subscribe((order) => {
      console.log(order);

    });
  }
}
