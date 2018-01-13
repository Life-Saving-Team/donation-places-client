import { NgModule } from '@angular/core';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { PlacesRoutingModule } from './plcaes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ViewPlacesComponent } from './view-places/view-places.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
    imports: [
        PlacesRoutingModule,
        SharedModule,
        PaginationModule.forRoot(),
        TypeaheadModule.forRoot()
    ],
    declarations: [
        ViewPlacesComponent
    ],
})
export class PlacesModule {

}



