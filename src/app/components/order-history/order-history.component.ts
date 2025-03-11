import { Component, OnInit } from '@angular/core';
import { OrderHistoryService } from '../../services/order-history.service';
import { Order } from '../../common/object/order';
import { CustomerInfo } from '../../common/object/customer-info';
import { CurrencyPipe, DatePipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-order-history',
  imports: [NgIf, NgForOf, CurrencyPipe, DatePipe],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css',
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [];
  storage: Storage = window.sessionStorage;
  customerInfo!: CustomerInfo;

  constructor(private orderHistoryService: OrderHistoryService) {}

  ngOnInit(): void {
    this.customerInfo = JSON.parse(this.storage.getItem('customerInfo')!);
    if (this.customerInfo) {
      this.handleOrderHistory();
    } else {
      console.error('Customer info not found');
    }
  }

  handleOrderHistory(): void {
    this.orderHistoryService
      .getOrderHistory(this.customerInfo.email)
      .subscribe((data) => {
        console.log(data);
        this.orders = data.content;
      });
  }
}
