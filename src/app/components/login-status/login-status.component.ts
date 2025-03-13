import { AsyncPipe, NgIf, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Customer } from '../../common/object/customer';

@Component({
  selector: 'app-login-status',
  imports: [NgIf, RouterLink, TitleCasePipe, AsyncPipe],
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css',
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated = false;
  customer: Customer = new Customer();

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.customer$.subscribe((customer) => {
      this.customer = customer!;
    });
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      console.log('update isAuthenticated: ' + isAuthenticated);
      this.isAuthenticated = isAuthenticated;
    });
  }

  logout() {
    this.authService.logout();
  }
}
