import { AbstractControl, FormGroup } from '@angular/forms';

export class MatchConfirmPassword {
  public static matchingPasswordConfirm(
    passwordControl: string,
    confirmPasswordControl: string
  ) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[passwordControl];
      const matchingControl = formGroup.controls[confirmPasswordControl];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
