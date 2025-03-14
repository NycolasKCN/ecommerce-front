import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { EcommerceFormService } from '../../../services/ecommerce-form.service';
import { Country } from '../../../common/object/country';
import { State } from '../../../common/object/state';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-address-form',
  imports: [ReactiveFormsModule, NgForOf, NgIf],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.css',
})
export class AddressFormComponent implements OnInit {
  @Input() title!: string;
  @Input() formGroupName!: string;
  form!: FormGroup;

  states: State[] = [];
  countries: Country[] = [];

  constructor(
    private rootFormGroup: FormGroupDirective,
    private formService: EcommerceFormService
  ) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;

    this.formService
      .getCountries()
      .subscribe((countries) => (this.countries = countries));
  }

  getStates() {
    const countryCode = this.form.value.country.code;
    this.formService
      .getStates(countryCode)
      .subscribe((states) => (this.states = states));
  }

  get street() {
    return this.form.get('street');
  }

  get city() {
    return this.form.get('city');
  }

  get state() {
    return this.form.get('state');
  }

  get country() {
    return this.form.get('country');
  }

  get zipCode() {
    return this.form.get('zipCode');
  }
}
