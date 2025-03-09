import { Injectable } from '@angular/core';
import { CartItem } from '../common/object/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: Map<number, CartItem> = new Map<number, CartItem>();

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() {}

  addItem(cartItem: CartItem) {
    if (this.items.has(cartItem.id)) {
      this.items.get(cartItem.id)!.quantity++;
    } else {
      this.items.set(cartItem.id, cartItem);
    }

    this.computeCartTotal();
  }

  decrementItemQuantity(cartItem: CartItem) {
    const itemQuantity = this.items.get(cartItem.id)!.quantity--;

    if (itemQuantity == 0) {
      this.removeItem(cartItem);
      return;
    }

    this.computeCartTotal();
  }

  removeItem(cartItem: CartItem) {
    this.items.delete(cartItem.id);
    this.computeCartTotal();
  }

  computeCartTotal() {
    let subTotal: number = 0;
    let subQuantityTotal: number = 0;

    this.items.forEach((item) => {
      subTotal += item.unitPrice * item.quantity;
      subQuantityTotal += item.quantity;
    });

    this.totalPrice.next(subTotal);
    this.totalQuantity.next(subQuantityTotal);
  }
}
