import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreditCardFormComponent } from '../credit-card-form/credit-card-form.component';
import { AddressFormComponent } from '../address-form/address-form.component';
import { EcommerceValidators } from '../../../common/validator/ecommerce-validators';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';
import {
  CheckoutService,
  PostRequestOrderItem,
  PostRequestPurchase,
} from '../../../services/checkout.service';
import { Address } from '../../../common/object/address';
import { Customer } from '../../../common/object/customer';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-checkout',
  imports: [
    ReactiveFormsModule,
    CurrencyPipe,
    AddressFormComponent,
    CreditCardFormComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  totalPrice: number = 0;
  totalQuantity: number = 0;

  checkoutFormGroup!: FormGroup;

  customer!: Customer;

  @ViewChild('shippingAddressForm') shippingAddressForm!: AddressFormComponent;
  @ViewChild('billingAddressForm') billingAddressForm!: AddressFormComponent;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.customer$.subscribe((customer) => {
      this.customer = customer!;
    });
  }

  ngOnInit(): void {
    this.reviewCartDetails();
    this.createCheckoutFormGroup();
  }

  onSubmit(): void {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    if (!this.customer) {
      alert('Please login to place an order');
      this.router.navigateByUrl('/login');
      return;
    }

    const purchase: PostRequestPurchase = this.createPostRequestPurchase();

    this.checkoutService.placeOrder(purchase).subscribe({
      next: (response) => {
        alert(
          `Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`
        );

        this.resetCart();
      },
      error: (error) => {
        alert(`There was an error: ${error.message}`);
      },
    });
  }

  resetCart() {
    this.cartService.clearCart();
    this.checkoutFormGroup.reset();
    this.router.navigateByUrl('/products');
  }

  reviewCartDetails(): void {
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));
    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );
  }

  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.billingAddressForm.states = this.shippingAddressForm.states;
      this.billingAddressForm.countries = this.shippingAddressForm.countries;
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value
      );
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }

  createPostRequestPurchase(): PostRequestPurchase {
    const shippingAddress: Address = this.checkoutFormGroup.controls[
      'shippingAddress'
    ].value as Address;
    const billingAddress: Address = this.checkoutFormGroup.controls[
      'billingAddress'
    ].value as Address;
    const orderItems: PostRequestOrderItem[] = Array.from(
      this.cartService.items.values()
    ).map((cartItem) => ({
      productId: cartItem.id,
      quantity: cartItem.quantity,
      priceAtPurchase: cartItem.unitPrice,
    }));

    return {
      customerId: this.customer.id,
      shippingAddress: {
        city: shippingAddress.city,
        street: shippingAddress.street,
        zipCode: shippingAddress.street,
        countryId: shippingAddress.country.id,
        stateId: shippingAddress.state.id,
      },
      billingAddress: {
        city: billingAddress.city,
        street: billingAddress.street,
        zipCode: billingAddress.street,
        countryId: billingAddress.country.id,
        stateId: billingAddress.state.id,
      },
      order: {
        totalQuantity: this.totalQuantity,
        totalPrice: this.totalPrice,
      },
      orderItems: orderItems,
    } as PostRequestPurchase;
  }

  createCheckoutFormGroup(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [
          Validators.required,
          EcommerceValidators.minLengthTrimmed(3),
        ]),
        city: new FormControl('', [
          Validators.required,
          EcommerceValidators.minLengthTrimmed(3),
        ]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [
          Validators.required,
          EcommerceValidators.minLengthTrimmed(3),
        ]),
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [
          Validators.required,
          EcommerceValidators.minLengthTrimmed(3),
        ]),
        city: new FormControl('', [
          Validators.required,
          EcommerceValidators.minLengthTrimmed(3),
        ]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [
          Validators.required,
          EcommerceValidators.minLengthTrimmed(3),
        ]),
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [
          Validators.required,
          EcommerceValidators.minLengthTrimmed(3),
        ]),
        cardNumber: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]{16}'),
        ]),
        securityCode: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]{3}'),
        ]),
        expirationMonth: new FormControl(''),
        expirationYear: new FormControl(''),
      }),
    });
  }
}
