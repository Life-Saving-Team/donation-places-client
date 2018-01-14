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

    formInitialValue
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
                this.formInitialValue = data
                this.formInitialValue.longitude = data.location.coordinates[0]
                this.formInitialValue.latitude = data.location.coordinates[1]
            }, error => this.sb.emitErrorSnackBar(error))
    }

    public onSubmit(e) {
        const updated = {
            name: this.formInitialValue.name,
            address: this.formInitialValue.address,
            location: {

            }
        }
        this.dataService.updatePlace(this.formInitialValue._id, e).subscribe(
            success => {
                this.router.navigate(['/success'])
            },
            error => this.sb.emitErrorSnackBar(error))
        )
    }



}
