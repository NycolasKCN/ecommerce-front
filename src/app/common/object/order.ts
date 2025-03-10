import { Address } from './address';
import { Customer } from './customer';
import { OrderItem } from './order-item';

export class Order {
  id: number;
  orderTrackingNumber: string;
  totalQuantity: number;
  totalPrice: number;
  status: string;
  dateCreated: Date;
  lastUpdated: Date;
  customer: Customer;
  shippingAddress: Address;
  billingAddress: Address;
  orderItems: Set<OrderItem>;

  constructor(
    id: number,
    orderTrackingNumber: string,
    totalQuantity: number,
    totalPrice: number,
    status: string,
    dateCreated: Date,
    lastUpdated: Date,
    customer: Customer,
    shippingAddress: Address,
    billingAddress: Address
  ) {
    this.id = id;
    this.orderTrackingNumber = orderTrackingNumber;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
    this.status = status;
    this.dateCreated = dateCreated;
    this.lastUpdated = lastUpdated;
    this.customer = customer;
    this.shippingAddress = shippingAddress;
    this.billingAddress = billingAddress;
    this.orderItems = new Set<OrderItem>();
  }
}
