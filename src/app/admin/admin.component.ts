import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  adminName: string = '';

  constructor(private router: Router, private adminService: AdminService) {
    this.adminName = adminService.getAdmin().name;
  }

  onAdminLogout(): void {
    localStorage.removeItem('admin-token');
    this.router.navigate(['admin/auth']);
  }
}
