import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/interfaces/admin';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  constructor(private adminService: AdminService, private router: Router) {

    if (localStorage.getItem('admin-token') != null) {
      this.router.navigate(['admin']);
    }
  }

  onAdminLogin(admin: Admin): void {
    this.adminService.adminLogin(admin).subscribe(
      (admin: Admin) => {
        if (admin != null) {
          localStorage.setItem('admin-token', JSON.stringify(admin));
          this.router.navigate(['admin']);
        }
      }
    )
  }
}
