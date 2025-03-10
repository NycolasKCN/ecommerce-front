import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/object/purchase';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private purchaseUrl: string =
    'http://localhost:8080/v1/api/checkout/purchase';

  constructor(private httpClient: HttpClient) {}

  placeOrder(purchase: PostRequestPurchase) {
    return this.httpClient.post<PostResponsePurchase>(
      this.purchaseUrl,
      purchase
    );
  }
}

interface PostResponsePurchase {
  orderTrackingNumber: string;
}

export interface PostRequestAddress {
  street: string;
  city: string;
  zipCode: string;
  countryId: number;
  stateId: number;
}

export interface PostRequestOrder {
  totalQuantity: number;
  totalPrice: number;
}

export interface PostRequestOrderItem {
  priceAtPurchase: number;
  quantity: number;
  productId: number;
}

export interface PostRequestPurchase {
  customerId: number;
  shippingAddress: PostRequestAddress;
  billingAddress: PostRequestAddress;
  order: PostRequestOrder;
  orderItems: PostRequestOrderItem[];
}
