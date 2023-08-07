import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ReportSales } from 'src/app/interfaces/report-sales';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-report-sales',
  templateUrl: './report-sales.component.html',
  styleUrls: ['./report-sales.component.css']
})
export class ReportSalesComponent implements OnInit {

  report: ReportSales[] = [];
  totalRevenue: number = 0;
  totalCosts: number = 0;
  totalProfit: number = 0;

  today: Date = new Date();
  startDate: string = new Date(this.today.getFullYear(), this.today.getMonth(), 2).toISOString().substring(0, 10);
  endDate: string = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 1).toISOString().substring(0, 10);

  constructor(
    private sellerService: SellerService
  ) { }

  ngOnInit(): void {
    this.getReport();
  }

  getReport() {
    this.sellerService.getSalesReport(this.startDate, this.endDate).subscribe((r) => {
      this.report = r;
      this.totalRevenue = 0;
      this.totalCosts = 0;
      this.totalProfit = 0;
      this.report.forEach(i => {
        this.totalRevenue += i.revenue;
        this.totalCosts += i.costs;
        this.totalProfit += i.profit;
      });
    });
  }

  generatePdf() {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Sales Report", doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });
    doc.setFontSize(14);
    doc.text(this.startDate + ' - ' + this.endDate, doc.internal.pageSize.getWidth() / 2, 24, { align: 'center' });
    autoTable(doc, {
      html: '#dataTable',
      theme: 'grid',
      startY: 28,
      styles: { halign: 'center' }
    });
    const pdfOutput = doc.output('blob');
    const url = URL.createObjectURL(pdfOutput);
    window.open(url, '_blank');
  }
}
