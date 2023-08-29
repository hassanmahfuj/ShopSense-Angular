import { Component } from '@angular/core';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  today: Date = new Date();
  startDate: string = new Date(this.today.getFullYear(), this.today.getMonth(), 2).toISOString().substring(0, 10);
  endDate: string = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 1).toISOString().substring(0, 10);

  constructor(
    private sellerService: SellerService
  ) {}

  onStockAlert() {
    const url = `http://localhost:8080/reports/stock-alert?id=${this.sellerService.getSellerToken().id}`
    window.open(url, '_blank');
  }

  onTopSelling() {
    const url = `http://localhost:8080/reports/top-selling?id=${this.sellerService.getSellerToken().id}`
    window.open(url, '_blank');
  }
}
