import { ValidatorFn } from '@angular/forms';

export function emailValidator(domains: string[]): ValidatorFn {
  const EMAIL = new RegExp(`/^([^@\s]+)@(abv\.bg|domain\.com)$/`);
  return (control) => {
    const isEmailInvalid = control.value === '' || EMAIL.test(control.value);
    return isEmailInvalid ? null : { emailValidator: true };
  };
}
