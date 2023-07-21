import { Component, OnInit } from '@angular/core';
import { Seller } from 'src/app/interfaces/seller';
import { Withdrawal } from 'src/app/interfaces/withdrawal';
import { SellerService } from 'src/app/services/seller.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  seller: Seller = {
    id: 0,
    name: '',
    storeName: '',
    officeAddress: '',
    email: '',
    password: '',
    role: '',
    balance: 0
  };

  transactions: Withdrawal[] = [];
  amount: number = 0;

  constructor(
    private sellerService: SellerService,
    private util: UtilService
  ) { }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() {
    this.sellerService.getSeller().subscribe((s) => {
      this.seller = s;
    });
    this.sellerService.getWithdrawals().subscribe((w) => {
      this.transactions = w;
    });
  }

  validate(): boolean {
    if (this.amount < 1000) {
      this.util.toastify(false, "", "Amount must be greater then 1,000 tk");
      return false;
    } else if (this.amount > 100000) {
      this.util.toastify(false, "", "Amount must be less then 1,00,000 tk");
      return false;
    } else if (this.amount > this.seller.balance){
      this.util.toastify(false, "", "Amount must be greater then current balance");
      return false;
    }
    return true;
  }

  onWithdraw() {
    if (this.validate()) {
      let w: Withdrawal = {
        sellerId: this.sellerService.getSellerToken().id,
        requestDate: new Date().toISOString(),
        amount: this.amount,
        paymentDate: '',
        status: '',
        id: 0
      }
      this.sellerService.requestWithdraw(w).subscribe((w) => {
        if (w != null) {
          this.util.toastify(true, "Requested for withdraw");
          this.amount = 0;
          this.refreshData();
        } else {
          this.util.toastify(false);
        }
      });
    }
  }

}
