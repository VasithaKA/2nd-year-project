import { AbstractControl, ValidationErrors } from "@angular/forms";

export class StringValidators {
    static cannotCantainSpace(control: AbstractControl): ValidationErrors | null {
        if ((control.value as string).indexOf(' ') >= 0) {
            return {cannotCantainSpace: true}
        }
        return null
    }
}