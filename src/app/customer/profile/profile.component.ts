import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  name: any;
  email: any;
  address: any;
  emailVerified: boolean = false;

  customer: any;
  verificationCode: any;
  emailVerifiedNotifyModal: boolean = false;

  constructor(private customerService: CustomerService, private util: UtilService) { }

  ngOnInit(): void {
    this.name = this.customerService.getCustomer().name;
    this.email = this.customerService.getCustomer().email;
    this.address = this.customerService.getCustomer().address;

    this.getCustomer();
  }

  getCustomer() {
    this.customerService.getCustomer1().subscribe(res => {
      this.customer = res;
      this.emailVerified = res.emailVerified;
    });
  }

  sendVerificationCode() {
    this.customerService.sendVerificationCode(this.customer).subscribe(res => {
      this.util.toastify(res, "Verification code sent");
    });
  }

  verifyCode() {
    this.customerService.verifyCode(this.verificationCode).subscribe(res => {
      this.emailVerifiedNotifyModal = res;
      this.util.toastify(res, "Email Verified", "Invalid Code");
      this.getCustomer();
    });
  }
}
