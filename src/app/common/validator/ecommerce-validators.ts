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
}
