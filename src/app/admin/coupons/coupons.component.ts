import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/interfaces/coupon';
import { CouponService } from 'src/app/services/coupon.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {

  coupons: Coupon[] = [];
  selected: Coupon = {
    id: 0,
    couponCode: '',
    couponValue: 0,
    couponType: 'Percentage',
    status: 'Pending'
  };
  mode: string = 'add';

  constructor(
    private couponService: CouponService,
    private util: UtilService
  ) { }

  ngOnInit(): void {
    this.getAllCoupons();
  }

  getAllCoupons() {
    this.couponService.getAllCoupons().subscribe((c) => {
      this.coupons = c;
    });
  }

  addCoupon() {
    this.mode = 'add'
    this.selected = {
      id: 0,
      couponCode: '',
      couponValue: 0,
      couponType: 'Percentage',
      status: 'Pending'
    }
  }

  editCoupon(c: Coupon) {
    this.mode = 'edit';
    this.selected = { ...c };
  }

  saveOrUpdate() {
    if (this.mode == 'add') {
      this.couponService.createCoupon(this.selected).subscribe((c) => {
        if (c != null) {
          this.util.toastify(true, "Coupon created");
          this.getAllCoupons();
        } else {
          this.util.toastify(false);
        }
      });

    } else {
      this.couponService.updateCoupon(this.selected).subscribe((success) => {
        this.util.toastify(success, "Coupon updated");
        this.getAllCoupons();
      });
    }
  }

  onDelete() {
    this.couponService.deleteCoupon(this.selected.id).subscribe((success) => {
      this.util.toastify(success, "Coupon deleted successfully");
      this.getAllCoupons();
    });
  }
}
