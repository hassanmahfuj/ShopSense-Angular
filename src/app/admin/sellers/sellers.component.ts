import { Component, OnInit } from '@angular/core';
import { Seller } from 'src/app/interfaces/seller';
import { AdminService } from 'src/app/services/admin.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.css']
})
export class SellersComponent implements OnInit {

  constructor(
    private adminService: AdminService,
    private util: UtilService
  ) { }

  ngOnInit(): void {
    this.getAllSellers();
  }

  sellers: Seller[] = [];

  getAllSellers() {
    this.adminService.getAllSellers().subscribe((p) => {
      this.sellers = p;
    });
  }

  updateProduct(p: Seller, s: string) {
    p.status = s;
    this.adminService.updateSeller(p).subscribe((p) => {
      if (p != null) {
        this.util.toastify(true, "Seller Updated");
      } else {
        this.util.toastify(false);
      }
    });
  }
}
