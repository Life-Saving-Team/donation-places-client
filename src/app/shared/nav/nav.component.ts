import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'app-nav',
    templateUrl: 'nav.component.html',
})
export class NavComponent {

    constructor(
        private router: Router
    ) {}

    onPlacesClick() {
        this.router.navigate(['/places'])
    }

    onMapClick() {
        this.router.navigate(['/map'])
    }

    onAddPlaceClick() {
        this.router.navigate(['/places/add'])
    }
}
