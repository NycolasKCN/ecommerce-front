import { CartItem } from './cart-item';

export class OrderItem {
  priceAtPurchase: number;
  quantity: number;
  productId: number;

  constructor(cartItem: CartItem) {
    this.priceAtPurchase = cartItem.unitPrice;
    this.quantity = cartItem.quantity;
    this.productId = cartItem.id;
  }
}
