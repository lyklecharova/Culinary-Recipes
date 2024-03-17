import { ValidatorFn } from '@angular/forms';

export function emailValidator(domains: string[]): ValidatorFn {
  const domainString = domains.join('|');
  const EMAIL = new RegExp(/^([^@\s]+)@(abv\.bg|gmail\.${domainString})$/);
  return (control) => {
    const isEmailInvalid = EMAIL.test(control.value);
    console.log(control.value);
    if (!isEmailInvalid) {
      return { emailValidator: true };
    }
    return null;
  };
}
