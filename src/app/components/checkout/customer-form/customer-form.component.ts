import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css',
})
export class CustomerFormComponent implements OnInit {
  @Input() formGroupName!: string;

  form!: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }

  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName') as FormGroup;
  }

  get email() {
    return this.form.get('email');
  }
}
