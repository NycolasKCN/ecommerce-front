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
  totalPrice: number = 0;
  totalQuantity: number = 0;

  checkoutFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          EcommerceValidators.notOnlyWhiteSpace,
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          EcommerceValidators.notOnlyWhiteSpace,
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.email,
        ]),
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });
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

  onSubmit() {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }
    console.log(this.checkoutFormGroup.value);
  }
}
