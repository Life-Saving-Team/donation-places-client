import { NgModule } from '@angular/core';

import { PlacesComponent } from './places.component';
import { PlacesRoutingModule } from './plcaes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ViewPlacesComponent } from './view-places/view-places.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
    imports: [
        PlacesRoutingModule,
        SharedModule,
        PaginationModule
    ],
    declarations: [
        PlacesComponent,
        ViewPlacesComponent
    ],
    exports: [
        PlacesComponent,
    ]
})
export class PlacesModule {

}



