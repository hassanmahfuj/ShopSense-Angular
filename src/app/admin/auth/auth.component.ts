import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/interfaces/admin';
import { AuthRequest } from 'src/app/interfaces/auth-request';
import { AuthResponse } from 'src/app/interfaces/auth-response';
import { AdminService } from 'src/app/services/admin.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  constructor(private adminService: AdminService, private router: Router, private util: UtilService) {

    if (localStorage.getItem('admin-token') != null) {
      this.router.navigate(['admin']);
    }
  }

  onAdminLogin(admin: Admin): void {
    let req: AuthRequest = {
      email: admin.email,
      password: admin.password
    }
    this.adminService.adminLogin(req).subscribe(
      (res: AuthResponse) => {
        if (res.status == "success") {
          localStorage.setItem('admin-jwt', res.token);
          localStorage.setItem('admin-token', JSON.stringify(res.user));
          this.router.navigate(['admin']);
        } else {
          this.util.toastify(false);
        }
      }
    )
  }
}
