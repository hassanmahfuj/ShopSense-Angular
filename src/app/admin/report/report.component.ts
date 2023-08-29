import { Component } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  today: Date = new Date();
  startDate: string = new Date(this.today.getFullYear(), this.today.getMonth(), 2).toISOString().substring(0, 10);
  endDate: string = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 1).toISOString().substring(0, 10);
  findById: any;

  onVendorSales() {
    const url = `http://localhost:8080/reports/vendor-sales?startDate=${this.startDate}&endDate=${this.endDate}`
    window.open(url, '_blank');
  }

  onProductDetails() {
    const url = `http://localhost:8080/reports/product-details`
    window.open(url, '_blank');
  }

  onFavoriteItem() {
    const url = `http://localhost:8080/reports/favorite-item`
    window.open(url, '_blank');
  }

  onCustomerReport() {
    const url = `http://localhost:8080/reports/customer`
    window.open(url, '_blank');
  }

  onAdminProfit() {
    const url = `http://localhost:8080/reports/admin-profit`
    window.open(url, '_blank');
  }

  onSellerReport() {
    const url = `http://localhost:8080/reports/seller`
    window.open(url, '_blank');
  }

  onCustomerOrders() {
    const url = `http://localhost:8080/reports/customer-order?id=${this.findById}`
    window.open(url, '_blank');
  }
}
