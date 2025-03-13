import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class EcommerceValidators {
  static minLengthTrimmed(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const hasMinLength: boolean =
        control.value != null && control.value.trim().length < minLength;
      return hasMinLength
        ? { minLengthTrimmed: { value: control.value } }
        : null;
    };
  }

  static validEmail(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailPattern: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
      const isValidEmail: boolean =
        control.value != null && emailPattern.test(control.value);
      return isValidEmail ? null : { validEmail: { value: control.value } };
    };
  }
}
