import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function eqValidator(val: any): ValidatorFn {
  return (ctrl: AbstractControl): ValidationErrors | null => {
    return ctrl.value !== val ? {eqValidatorErr: true} : null;
  };
}

export function neValidator(val: any): ValidatorFn {
  return (ctrl: AbstractControl): ValidationErrors | null => {
    return ctrl.value === val ? {neValidatorErr: true} : null;
  };
}
