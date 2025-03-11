import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { CustomerInfo } from '../../../common/object/customer-info';

@Component({
  selector: 'app-customer-form',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css',
})
export class CustomerFormComponent implements OnInit {
  @Input() formGroupName!: string;

  form!: FormGroup;

  storage: Storage = sessionStorage;

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;

    const customerInfo: CustomerInfo = JSON.parse(
      this.storage.getItem('customerInfo') || '{}'
    ) as CustomerInfo;

    this.email?.setValue(customerInfo.email);
    this.firstName?.setValue(customerInfo.firstName);
    this.lastName?.setValue(customerInfo.lastName);
  }

  get firstName() {
    return this.form.get('firstName') as FormControl;
  }

  get lastName() {
    return this.form.get('lastName') as FormControl;
  }

  get email() {
    return this.form.get('email') as FormControl;
  }
}
