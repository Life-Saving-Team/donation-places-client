import { globalValidators } from '../../shared/global-validators';
import { FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SavedPlaceService } from '../../shared/services/saved-place.service';
import { categories } from '../../config/categories';
import { governerates } from '../../config/governerates';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'place-form',
    templateUrl: 'place-form.component.html',
})
export class PlaceFormComponent implements OnInit {

    form: FormGroup
    categories = categories
    governerates = governerates
    placeToEdit

    constructor(
        public savedPlaceService: SavedPlaceService,
        private fb: FormBuilder,
        private router: Router
    ) { }

    ngOnInit() {
        this.buildForm()
    }

    private buildForm() {
        this.form = this.fb.group({
            name: [this.placeToEdit ? this.placeToEdit.name : '', Validators.required],
            address: [this.placeToEdit ? this.placeToEdit.address :
                this.savedPlaceService.placeData ? this.savedPlaceService.placeData.address : '', Validators.required],
            category:
                [this.placeToEdit ? this.placeToEdit.email : '',
                Validators.compose([Validators.required, globalValidators.mailFormat])],
            governerate: [this.placeToEdit ? this.placeToEdit.telephone : '', Validators.required],
            isPrivate: [this.placeToEdit ? this.placeToEdit.bloodGroup : false, Validators.required],
            longitude:
                [this.placeToEdit ? this.placeToEdit.longitude :
                    this.savedPlaceService.placeData ? this.savedPlaceService.placeData.longitude : '',
                Validators.compose([Validators.required, globalValidators.longitudeFormat])],
            latitude:
                [this.placeToEdit ? this.placeToEdit.latitude :
                    this.savedPlaceService.placeData ? this.savedPlaceService.placeData.longitude : '',
                Validators.compose([Validators.required, globalValidators.latitudeFormat])],
        })
    }

    onChangeLocationRequest() {
        this.router.navigate(['/'])
    }

    isIncorrectMailFormat(control) {
        return this.form.get(control).hasError('incorrectMailFormat')
    }
    isIncorrectTelephoneFormat(control) {
        return this.form.get(control).hasError('incorrectTelephoneFormat')
    }
    isIncorrectLongitudeFormat(control) {
        return this.form.get(control).hasError('incorrectLongitudeFormat')
    }
    isIncorrectLatitudeFormat(control) {
        return this.form.get(control).hasError('incorrectLatitudeFormat')
    }
}
