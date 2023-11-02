import { AbstractControl, ValidationErrors } from '@angular/forms';

export class NoSpace {
  public static NoSpaceValidation(
    controls: AbstractControl
  ): ValidationErrors | null {
    let controlValue = controls.value as string;
    if (controlValue.indexOf(' ') >= 0) {
      return { noSpaceValidator: true };
    }
    return null;
  }
}
