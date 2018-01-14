import { SavedPlaceService } from '../../shared/services/saved-place.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { SnackBarService } from '../../shared/services/snackbar.service';
import { DataService } from '../../shared/services/data.service';

@Component({
    selector: 'edit-place',
    templateUrl: 'edit-place.component.html',
})

export class EditPlaceComponent {

    placeToEdit
    constructor(private activatedRoute: ActivatedRoute,
        private dataService: DataService,
        private router: Router,
        private sb: SnackBarService,
        private savedPlaceService: SavedPlaceService
    ) {
        this.grabIdAndGetInfo()
    }

    grabIdAndGetInfo() {
        this.activatedRoute.params.flatMap(data => this.dataService.getPlaceInfo(data.id))
            .subscribe(data => {
                console.log(data);
                this.placeToEdit = data
                // this.place.location = undefined
                this.placeToEdit.longitude = data.location.coordinates[0]
                this.placeToEdit.latitude = data.location.coordinates[1]
                
            }, error => this.sb.emitErrorSnackBar(error))
    }

    public onSubmit(e) {
        this.dataService.updatePlace(this.placeToEdit._id, e).subscribe(
            success => {
                this.router.navigate(['/success'])
            },
            error => console.log(error)
        )
    }



}
