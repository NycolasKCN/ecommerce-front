import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/object/cart-item';
import { CurrencyPipe, NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-details',
  imports: [NgForOf, CurrencyPipe, RouterLink],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css',
})
export class CartDetailsComponent implements OnInit {
  cartItems: Map<number, CartItem> = new Map<number, CartItem>();
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.listCartDetails();
  }

  incrementQuantity(cartItem: CartItem) {
    this.cartService.addItem(cartItem);
  }

  decrementQuantity(cartItem: CartItem) {
    this.cartService.decrementItemQuantity(cartItem);
  }

  removeItem(cartItem: CartItem) {
    this.cartService.removeItem(cartItem);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  listCartDetails() {
    this.cartItems = this.cartService.items;
    this.cartService.totalPrice.subscribe((value) => (this.totalPrice = value));
    this.cartService.totalQuantity.subscribe(
      (value) => (this.totalQuantity = value)
    );

    this.cartService.computeCartTotal();
  }
}
