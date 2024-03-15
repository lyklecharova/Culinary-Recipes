import { ValidatorFn } from '@angular/forms';

export function matchPasswordsValidator(
  passwordControlName: string,
  confirmPasswordControlName: string
): ValidatorFn {
  return (control) => {
    const passwordFormControl = control.get(passwordControlName);
    const confirmPasswordFormControl = control.get(confirmPasswordControlName);

    const areMatching =
      passwordFormControl?.value == confirmPasswordFormControl?.value;

    return areMatching ? null : { matchPasswordsValidator: true };
  };
}
