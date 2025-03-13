import { Component, OnInit } from '@angular/core';
import { OrderHistoryService } from '../../services/order-history.service';
import { Order } from '../../common/object/order';
import {
  CurrencyPipe,
  DatePipe,
  NgForOf,
  NgIf,
  TitleCasePipe,
} from '@angular/common';
import { Customer } from '../../common/object/customer';
import { Router } from '@angular/router';
import { routes } from '../../app.routes';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-order-history',
  imports: [NgIf, NgForOf, CurrencyPipe, DatePipe, TitleCasePipe],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css',
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [];
  customer!: Customer;

  constructor(
    private orderHistoryService: OrderHistoryService,
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.customer$.subscribe((customer) => {
      this.customer = customer!;
    });
  }

  ngOnInit(): void {
    if (this.customer) {
      this.handleOrderHistory();
    } else {
      console.error('Customer info not found');
      this.router.navigate(['/login']);
    }
  }

  handleOrderHistory(): void {
    this.orderHistoryService
      .getOrderHistory(this.customer.email)
      .subscribe((data) => {
        console.log(data);
        this.orders = data.content;
      });
  }
}
