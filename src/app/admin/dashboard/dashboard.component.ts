import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AdminStat } from 'src/app/interfaces/admin-stat';
import { AdminService } from 'src/app/services/admin.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  stat: AdminStat = {};
  weeklyRevenue: number = 0;

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.getStat();
  }

  getStat() {
    this.adminService.getStat().subscribe((s) => {
      this.stat = s;
      console.log(this.stat);

      let lables: string[] = [];
      let data: string[] = [];

      this.weeklyRevenue = 0;
      this.stat.weeklyRevenue?.map(d => {
        lables.push(d.dayName);
        data.push(d.revenue);
        this.weeklyRevenue += parseInt(d.revenue);
      });
      this.createLineChart("chart1", lables, data);

      lables = [];
      data = [];
      this.stat.bestSeller?.map(d => {
        lables.push(d.storeName);
        data.push(d.revenue);
      });
      this.createDoughnutChart("chart2", lables, data);

      lables = [];
      data = [];
      this.stat.orderStatus?.map(d => {
        lables.push(d.status);
        data.push(d.count);
      });
      this.createDoughnutChart("chart3", lables, data);
    });
  }

  createDoughnutChart(canvasId: string, labels: string[], data: string[]) {
    new Chart(canvasId, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          borderWidth: [1, 1, 1, 1]
        }]
      },
      options: {
        maintainAspectRatio: false,
        cutout: 82,
        plugins: {
          legend: {
            display: false,
          }
        }
      }
    });
  }

  createLineChart(canvasId: string, labels: string[], data: string[]) {
    new Chart(canvasId, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Revenue',
          data: data,
          fill: {
            target: 'origin',
            above: 'rgb(21 202 32 / 15%)',   // Area will be red above the origin
            //below: 'rgb(21 202 32 / 100%)'   // And blue below the origin
          },
          tension: 0.4,
          borderWidth: 3
        }]
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
