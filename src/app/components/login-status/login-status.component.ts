import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CustomerInfo } from '../../common/object/customer-info';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-status',
  imports: [NgIf, RouterLink],
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css',
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean = false;
  customerInfo!: CustomerInfo;

  storage: Storage = window.sessionStorage;

  constructor(public auth: AuthService) {}

  ngOnInit() {
    this.auth.user$.subscribe((user) => {
      this.customerInfo = {
        name: user?.name,
        email: user?.email,
        firstName: user?.given_name,
        lastName: user?.family_name,
      } as CustomerInfo;
      this.storage.setItem('customerInfo', JSON.stringify(this.customerInfo));
    });
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }
}
