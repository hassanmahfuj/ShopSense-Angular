import { Component, OnInit } from '@angular/core';
import { WithdrawalAdmin } from 'src/app/interfaces/withdrawal-admin';
import { AdminService } from 'src/app/services/admin.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  pendingWithdrawals: WithdrawalAdmin[] = [];
  transactions: WithdrawalAdmin[] = [];

  constructor(
    private adminService: AdminService,
    private util: UtilService
  ) { }

  ngOnInit(): void {
    this.getWithdrawals();
  }

  getWithdrawals() {
    this.pendingWithdrawals = [];
    this.transactions = [];

    this.adminService.getWithdrawals().subscribe((w) => {
      w.forEach((wa) => {
        if (wa.status == 'Pending') {
          this.pendingWithdrawals.push(wa);
        } else {
          this.transactions.push(wa);
        }
      });
    });
  }

  updateWithdraw(pos: number, action: string) {
    if(action == 'Paid') {
      this.pendingWithdrawals[pos].paymentDate = new Date().toISOString();
    }
    this.pendingWithdrawals[pos].status = action;
    this.adminService.updateWithdraw(this.pendingWithdrawals[pos]).subscribe((success) => {
      this.util.toastify(success, "Withdraw status updated");
      this.getWithdrawals();
    });
  }
}
