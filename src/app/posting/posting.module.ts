// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { SharedModule } from '../shared/shared.module';
import { PostingRoutingModule } from './posting-routing.module';
import { PostingComponent } from './posting.component';
import { PlaceFormComponent } from './place-form/place-form.component';
import { AddPlaceComponent } from './add-place/add-place.component';
// import { EditPlaceComponent } from './edit-place/edit-place.component';

@NgModule({
    imports: [
        PostingRoutingModule,
        SharedModule,
    ],
    declarations: [
        PostingComponent,
        PlaceFormComponent,
        AddPlaceComponent,
        // EditPlaceComponent
    ],
})
export class PostingModule {

}
