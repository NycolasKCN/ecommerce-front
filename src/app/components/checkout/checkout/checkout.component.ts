import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { CreditCardFormComponent } from '../credit-card-form/credit-card-form.component';
import { AddressFormComponent } from '../address-form/address-form.component';
import { EcommerceValidators } from '../../../common/validator/ecommerce-validators';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [
    ReactiveFormsModule,
    CurrencyPipe,
    CustomerFormComponent,
    AddressFormComponent,
    CreditCardFormComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  // TODO: improve checkout saving the form data and cart data on cache of the browser

  totalPrice: number = 0;
  totalQuantity: number = 0;

  checkoutFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.reviewCartDetails();
    this.createCheckoutFormGroup();
  }

  onSubmit(): void {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }
    console.log(this.checkoutFormGroup.value);
  }

  reviewCartDetails(): void {
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));
    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );
  }

  copyShippingAddressToShippingAddress(event: any) {
    // TODO: fix copy bug
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value
      );
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }

  createCheckoutFormGroup(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [
          Validators.required,
          EcommerceValidators.minLengthTrimmed(3),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          EcommerceValidators.minLengthTrimmed(3),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
      }),
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
        expirationMonth: new FormControl('', [Validators.required]),
        expirationYear: new FormControl('', [Validators.required]),
      }),
    });
  }
}
