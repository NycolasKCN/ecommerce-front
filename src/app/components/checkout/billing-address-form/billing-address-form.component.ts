import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-billing-address-form',
  imports: [ReactiveFormsModule],
  templateUrl: './billing-address-form.component.html',
  styleUrl: './billing-address-form.component.css',
})
export class BillingAddressFormComponent implements OnInit {
  @Input() formGroupName!: string;
  form!: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit() {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }
}
