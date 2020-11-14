import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function notInValidator<T>(values: T[], predicate: (a: T, b: T) => boolean ): ValidatorFn{
  return (ctrl: AbstractControl): ValidationErrors | null => {
    return ctrl.dirty && values?.some(value => predicate(ctrl.value, value)) ? {notInError: true} : null;
  };
}
