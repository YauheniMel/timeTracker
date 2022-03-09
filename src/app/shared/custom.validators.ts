import { FormGroup, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static compareValidator(
    controlName: string,
    confirmControlName: string
  ): ValidationErrors {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const confirmControl = formGroup.controls[confirmControlName];
      if (confirmControl.errors) {
        return;
      }
      if (control.value !== confirmControl.value) {
        confirmControl.setErrors({ compareValidator: true });
      } else {
        confirmControl.setErrors(null);
      }
    };
  }
}
