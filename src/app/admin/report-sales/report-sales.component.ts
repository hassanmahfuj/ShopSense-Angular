import { Component } from '@angular/core';
import { ReportSales } from 'src/app/interfaces/report-sales';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-report-sales',
  templateUrl: './report-sales.component.html',
  styleUrls: ['./report-sales.component.css']
})
export class ReportSalesComponent {
  report: ReportSales[] = [];
  totalRevenue: number = 0;
  totalProfit: number = 0;

  today: Date = new Date();
  startDate: string = new Date(this.today.getFullYear(), this.today.getMonth(), 2).toISOString().substring(0, 10);
  endDate: string = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 1).toISOString().substring(0, 10);

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.getReport();
  }

  getReport() {
    this.adminService.getSalesReport(this.startDate, this.endDate).subscribe((r) => {
      this.report = r;
      this.totalRevenue = 0;
      this.totalProfit = 0;
      this.report.forEach(i => {
        this.totalRevenue += i.revenue;
        this.totalProfit += i.profit;
      });
    });
  }
}
