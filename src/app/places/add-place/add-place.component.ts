import { Router } from '@angular/router';
import { SavedPlaceService } from '../../shared/services/saved-place.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { SnackBarService } from '../../shared/services/snackbar.service';

@Component({
    selector: 'add-place',
    templateUrl: 'add-place.component.html',
})


export class AddPlaceComponent implements OnInit {

    initialFormValue

    constructor(
        private dataService: DataService,
        private savedPlaceService: SavedPlaceService,
        private router: Router,
        private sb: SnackBarService
    ) { }

    ngOnInit() {
        this.initialFormValue = {
            name: '',
            address: this.savedPlaceService.placeData ? this.savedPlaceService.placeData.address : '',
            latitude: this.savedPlaceService.placeData ? this.savedPlaceService.placeData.latitude : '',
            longitude: this.savedPlaceService.placeData ? this.savedPlaceService.placeData.longitude : '',
            isPrivate: false,
            category: '',
            city: ''
        }
    }

    onSubmit(formData) {
        return this.dataService.addPlace(formData).subscribe(
            data => {
                this.savedPlaceService.placeId = data._id
                this.router.navigate(['/success'])
            },
            error => this.sb.emitErrorSnackBar(error)
        )
    }

    onChangeLocationRequest() {
        this.router.navigate(['/'])
    }






}
