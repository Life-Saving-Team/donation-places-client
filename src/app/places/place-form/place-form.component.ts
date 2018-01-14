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
    @Input() initialFormValue
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
            name: [this.initialFormValue.name, Validators.required],
            address: [this.initialFormValue.address, Validators.required],
            category: [this.initialFormValue.category, Validators.required],
            city: [this.initialFormValue.city, Validators.required],
            isPrivate: [this.initialFormValue.isPrivate, Validators.required],
            longitude: [this.initialFormValue.longitude, Validators.compose([Validators.required, globalValidators.longitudeFormat])],
            latitude: [this.initialFormValue.latitude, Validators.compose([Validators.required, globalValidators.latitudeFormat])],
        })
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
