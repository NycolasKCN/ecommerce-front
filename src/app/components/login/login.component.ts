import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EcommerceValidators } from '../../common/validator/ecommerce-validators';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  storage: Storage = sessionStorage;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginFormGroup = new FormGroup({
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
    if (this.loginFormGroup.invalid) {
      this.loginFormGroup.markAllAsTouched();
      return;
    }

    const loginRequestData = {
      email: this.email?.value,
      password: this.password?.value,
    };

    this.authService.login(loginRequestData).subscribe(
      (response) => {
        this.router.navigate(['/products']);
      },
      (error) => {
        console.log(error);
        this.errorMessage =
          'Login failed. Please check your credentials and try again.';
      }
    );
  }

  get email() {
    return this.loginFormGroup.get('email');
  }

  get password() {
    return this.loginFormGroup.get('password');
  }
}
