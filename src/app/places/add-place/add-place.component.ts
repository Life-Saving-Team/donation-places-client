import { Router } from '@angular/router';
import { SavedPlaceService } from '../../shared/services/saved-place.service';
import { Component } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { SnackBarService } from '../../shared/services/snackbar.service';

@Component({
    selector: 'add-place',
    templateUrl: 'add-place.component.html',
})


export class AddPlaceComponent {
    constructor(
        private dataService: DataService,
        private savedPlace: SavedPlaceService,
        private router: Router,
        private sb: SnackBarService
    ) {}

    onSubmit(formData) {
        return this.dataService.addPlace(formData).subscribe(
            data => {
                this.savedPlace.placeId = data._id
                this.router.navigate(['/success'])
            },
            error => this.sb.emitErrorSnackBar(error)
        )
    }







}
