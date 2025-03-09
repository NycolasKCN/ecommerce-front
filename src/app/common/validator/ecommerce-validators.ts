import { AbstractControl, ValidationErrors } from '@angular/forms';

export class EcommerceValidators {
  static notOnlyWhiteSpace(control: AbstractControl): ValidationErrors | null {
    const onlyWhiteSpaces: boolean =
      control.value != null && control.value.trim().length === 0;
    return onlyWhiteSpaces
      ? { onlyWhiteSpace: { value: control.value } }
      : null;
  }
}
