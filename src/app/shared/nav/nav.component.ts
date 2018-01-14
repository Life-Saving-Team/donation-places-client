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
    logout() {
        console.log('Fake Logging out');
    }

    onPlacesClick() {
        this.router.navigate(['/places'])
    }

    onMapClick() {
        this.router.navigate(['/map'])
    }
}
