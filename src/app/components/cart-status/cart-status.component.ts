import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-status',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css',
})
export class CartStatusComponent implements OnInit {
  totalPrice: number = 0.0;
  totalQuantityItems: number = 0;

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.updateCartStatus();
  }

  updateCartStatus() {
    this.cartService.totalPrice.subscribe((value) => (this.totalPrice = value));
    this.cartService.totalQuantity.subscribe(
      (value) => (this.totalQuantityItems = value)
    );
  }
}
