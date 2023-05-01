import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidator{
    static MatchPasswordValidator(source: string, target: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
          const sourceCtrl = control.get(source);
          const targetCtrl = control.get(target);
    
          return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
            ? { passwordMismatch: true }
            : null;
        };
      }

    static MatchEmailValidator(source: string, target: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
          const sourceCtrl = control.get(source);
          const targetCtrl = control.get(target);
    
          return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
            ? { emailMismatch: true }
            : null;
        };
      }

}