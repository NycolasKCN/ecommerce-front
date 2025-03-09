import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { EcommerceFormService } from '../../../services/ecommerce-form.service';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-credit-card-form',
  imports: [ReactiveFormsModule, NgForOf, NgIf],
  templateUrl: './credit-card-form.component.html',
  styleUrl: './credit-card-form.component.css',
})
export class CreditCardFormComponent implements OnInit {
  @Input() formGroupName!: string;
  form!: FormGroup;

  months: number[] = [];
  creditCardYears: number[] = [];

  constructor(
    private rootFormGroup: FormGroupDirective,
    private formService: EcommerceFormService
  ) {}

  ngOnInit(): void {
    this.formService
      .getCreditCardMonths()
      .subscribe((data) => (this.months = data));
    this.formService
      .getCreditCardYears()
      .subscribe((data) => (this.creditCardYears = data));

    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }

  get cardType() {
    return this.form.get('cardType');
  }

  get nameOnCard() {
    return this.form.get('nameOnCard');
  }

  get cardNumber() {
    return this.form.get('cardNumber');
  }

  get securityCode() {
    return this.form.get('securityCode');
  }

  get expirationMonth() {
    return this.form.get('expirationMonth');
  }

  get expirationYear() {
    return this.form.get('expirationYear');
  }
}
