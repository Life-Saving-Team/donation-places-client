import { globalValidators } from '../../shared/global-validators';
import { FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SavedPlaceService } from '../../shared/services/saved-place.service';
import { categories } from '../../config/categories';
import { cities } from '../../config/cities';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'place-form',
    templateUrl: 'place-form.component.html',
})
export class PlaceFormComponent implements OnInit {

    form: FormGroup
    categories = categories
    cities = cities
    @Input() placeToEdit
    @Output() submitted = new EventEmitter

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
                [this.placeToEdit ? this.placeToEdit.category : '', Validators.required],
            city: [this.placeToEdit ? this.placeToEdit.telephone : '', Validators.required],
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

    isIncorrectLongitudeFormat(control) {
        return this.form.get(control).hasError('incorrectLongitudeFormat')
    }
    isIncorrectLatitudeFormat(control) {
        return this.form.get(control).hasError('incorrectLatitudeFormat')
    }

    onSubmit(e) {
        this.submitted.emit(e)
    }
}
