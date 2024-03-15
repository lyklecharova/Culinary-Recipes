import { ValidatorFn } from '@angular/forms';

export function matchPasswordsValidator(
  passwordControl: string,
  confirmPasswordControl: string
): ValidatorFn {
  return (control) => {
    const passwordFirst = control.get(passwordControl);
    const passwordSecond = control.get(confirmPasswordControl);

    return null;
  };
}
