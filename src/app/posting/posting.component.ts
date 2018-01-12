import { categories } from '../config/categories';
import { governerates } from '../config/governerates';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { SavedPlace } from '../shared/services/user.service';
import { Component, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { globalValidators } from '../shared/global-validators';
import { SnackBarService } from '../shared/services/snackbar.service';

@Component({
    selector: 'posting',
    templateUrl: 'posting.component.html',
})
export class PostingComponent {
    isEdit: boolean
    form: FormGroup
    categories = categories
    governerates = governerates
    constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute,
        private dataService: DataService, private router: Router, private savedPlace: SavedPlace,
        private sb: SnackBarService) {
        this.grabIdAndGetInfo()
    }

    grabIdAndGetInfo() {
        if (this.activatedRoute.snapshot.url[0]) {

            this.isEdit = true
            this.getDonorInfo(this.activatedRoute.snapshot.url[0].path)
        } else if (this.savedPlace.placeId) {
            this.isEdit = true
            this.buildForm()
        } else {
            this.isEdit = false
            this.buildForm()
        }



    }

    private getDonorInfo(id) {
        this.dataService.getPlaceInfo(id).subscribe(
            data => {
                this.savedPlace.placeId = id
                this.savedPlace.placeData = data
                this.buildForm()
            },
            error => {
                this.sb.emitErrorSnackBar('This account is currently non-existant')
                this.router.navigate(['/map'])
            }
        )
    }

    onRemove() {
        return this.dataService.deletePlace(this.savedPlace.placeId).subscribe(
            data => {
                this.savedPlace.clearData()
                this.form.reset()
                this.sb.emitSuccessSnackBar('You have successfully deleted your info')
                this.router.navigate(['/map'])
            },
            error => console.log(error)
        )
    }
    onSubmit(formData) {
        if (this.savedPlace.placeId) return this.dataService.updatePlace(this.savedPlace.placeId, formData).subscribe(
            success => {
                this.router.navigate(['/success'])
            },
            error => console.log(error)
        )
        else return this.dataService.addPlace(formData).subscribe(
            data => {
                this.savedPlace.placeId = data._id
                this.router.navigate(['/success'])
            },
            error => console.log(error)
        )
    }


    onChangeLocationRequest() {
        this.router.navigate(['/map'])
    }


    buildForm() {

        if (this.savedPlace.placeData) {
            this.form = this.fb.group({
                name: [this.savedPlace.placeData.name || '', Validators.required],
                address: [this.savedPlace.placeData.address || '', Validators.required],
                category: [this.savedPlace.placeData.email || '', globalValidators.mailFormat],
                governerate: [this.savedPlace.placeData.telephone || '', globalValidators.telephoneFormat],
                isPrivate: [this.savedPlace.placeData.bloodGroup || false, Validators.required],
                longitude: [this.savedPlace.placeData.longitude || '', globalValidators.longitudeFormat],
                latitude: [this.savedPlace.placeData.latitude || '', globalValidators.latitudeFormat],
            })
        }  else {
            this.form = this.fb.group({
                name: ['', Validators.required],
                address: ['', Validators.required],
                category: ['', globalValidators.mailFormat],
                governerate: ['', globalValidators.telephoneFormat],
                isPrivate: [false, Validators.required],
                longitude: ['', globalValidators.longitudeFormat],
                latitude: ['', globalValidators.latitudeFormat],
            })

        }

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
