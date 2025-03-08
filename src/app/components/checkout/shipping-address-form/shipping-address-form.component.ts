import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-shipping-address-form',
  imports: [ReactiveFormsModule],
  templateUrl: './shipping-address-form.component.html',
  styleUrl: './shipping-address-form.component.css',
})
export class ShippingAddressFormComponent implements OnInit {
  @Input() formGroupName!: string;

  form!: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }
}
