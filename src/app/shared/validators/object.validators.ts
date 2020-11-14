import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function eqValidator(comparedCtrl: AbstractControl): ValidatorFn{
  return (ctrl: AbstractControl): ValidationErrors | null => {
    if (!comparedCtrl.value || !ctrl.value) { return null; }
    const comparedVal = comparedCtrl?.value;
    return ctrl.value !== comparedVal ? {eqCtrlValidator: true} : null;
  };
}

