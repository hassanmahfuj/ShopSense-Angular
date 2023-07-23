import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/interfaces/customer';
import { AdminService } from 'src/app/services/admin.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  constructor(
    private adminService: AdminService,
    private util: UtilService
  ) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  customers: Customer[] = [];

  getAllCustomers() {
    this.adminService.getAllCustomers().subscribe((p) => {
      this.customers = p;
    });
  }

  updateProduct(p: Customer, s: string) {
    p.status = s;
    this.adminService.updateCustomer(p).subscribe((p) => {
      if (p != null) {
        this.util.toastify(true, "Customer Updated");
      } else {
        this.util.toastify(false);
      }
    });
  }
}
