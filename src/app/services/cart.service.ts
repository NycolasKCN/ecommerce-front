import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: Map<number, CartItem> = new Map<number, CartItem>();

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}

  addItem(newItem: CartItem) {
    if (this.items.has(newItem.id)) {
      this.items.get(newItem.id)!.quantity++;
    } else {
      this.items.set(newItem.id, newItem);
    }

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
