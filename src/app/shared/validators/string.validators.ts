import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function lengthValidator(...lengths: number[]): ValidatorFn {
  return (ctrl: AbstractControl): ValidationErrors | null => {
    if (lengths.some(l => l === (ctrl.value?.length ?? 0))) {
      return null;
    }
    return {lengthValidator: true};
  };
}
