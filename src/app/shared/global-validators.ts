
export const globalValidators = {
    mailFormat(control): ValidationResult {
        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        if (control.value && control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
            return { "incorrectMailFormat": true };
        }
        return null;
    },

    telephoneFormat(control): ValidationResult {
        var REGEX = /(00|\+)\d{12}$/i;
        if (control.value && control.value != "" && (control.value.length <= 5 || !REGEX.test(control.value))) {
            return { "incorrectTelephoneFormat": true };
        }
        return null;
    },

    longitudeFormat(control): ValidationResult {
        var REGEX = /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,30})?))$/i;
        if (control.value && control.value != "" &&  !REGEX.test(control.value)) {
            return { "incorrectLongitudeFormat": true };
        }
        return null;
    },

    latitudeFormat(control): ValidationResult {
        var REGEX = /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,30})?))$/i;
        if (control.value && control.value != "" &&  !REGEX.test(control.value)) {
            return { "incorrectLatitudeFormat": true };
        }
        return null;
    }
}

interface ValidationResult {
    [key: string]: boolean;
}

