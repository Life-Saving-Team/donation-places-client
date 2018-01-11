import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
    selector: 'app-nav',
    templateUrl: 'nav.component.html',
    styleUrls: ['nav.component.scss'],
})
export class NavComponent {
    constructor( private dataService: DataService){}

    isConnected(){
        return this.dataService.isConnected()
    }
}
