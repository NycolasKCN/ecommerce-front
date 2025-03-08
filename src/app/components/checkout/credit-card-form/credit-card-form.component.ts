import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { EcommerceFormService } from '../../../services/ecommerce-form.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-credit-card-form',
  imports: [ReactiveFormsModule, NgForOf],
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
}
