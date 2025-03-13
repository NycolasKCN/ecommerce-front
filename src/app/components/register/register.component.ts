import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { EcommerceValidators } from '../../common/validator/ecommerce-validators';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerFormGroup!: FormGroup;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerFormGroup = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        EcommerceValidators.minLengthTrimmed(3),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        EcommerceValidators.minLengthTrimmed(3),
      ]),
      email: new FormControl('', [
        Validators.required,
        EcommerceValidators.validEmail(),
      ]),
      password: new FormControl('', [
        Validators.required,
        EcommerceValidators.minLengthTrimmed(8),
      ]),
    });
  }

  onSubmit() {
    if (this.registerFormGroup.invalid) {
      this.registerFormGroup.markAllAsTouched();
      return;
    }

    const registerRequestData = {
      firstName: this.firstName?.value,
      lastName: this.lastName?.value,
      email: this.email?.value,
      password: this.password?.value,
    };

    this.authService.register(registerRequestData).subscribe(
      (response) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
        this.errorMessage =
          'Registration failed. Please check your details and try again.';
      }
    );
  }

  get firstName() {
    return this.registerFormGroup.get('firstName');
  }

  get lastName() {
    return this.registerFormGroup.get('lastName');
  }

  get email() {
    return this.registerFormGroup.get('email');
  }

  get password() {
    return this.registerFormGroup.get('password');
  }
}
