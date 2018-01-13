import { Component } from '@angular/core';

@Component({
    selector: 'app-nav',
    templateUrl: 'nav.component.html',
})
export class NavComponent {

    logout() {
        console.log('Fake Logging out');
    }
}
