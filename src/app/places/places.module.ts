import { AddPlaceComponent } from '../places/add-place/add-place.component';
import { PlaceFormComponent } from '../places/place-form/place-form.component';
import { NgModule } from '@angular/core';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { PlacesRoutingModule } from './plcaes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ViewPlacesComponent } from './view-places/view-places.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PlacesComponent } from './places.component';
import { EditPlaceComponent } from './edit-place/edit-place.component';

@NgModule({
    imports: [
        PlacesRoutingModule,
        SharedModule,
        PaginationModule.forRoot(),
        TypeaheadModule.forRoot()
    ],
    declarations: [
        PlacesComponent,
        ViewPlacesComponent,
        PlaceFormComponent,
        AddPlaceComponent,
        EditPlaceComponent
    ],
})
export class PlacesModule {

}



