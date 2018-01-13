import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { ViewPlacesComponent } from './view-places/view-places.component';
import { PlacesComponent } from './places.component';
import { AddPlaceComponent } from './add-place/add-place.component';
import { EditPlaceComponent } from './edit-place/edit-place.component';

const routes: Routes = [
    {
        path: '', component: PlacesComponent, children: [
            { path: '', pathMatch: 'full', redirectTo: 'view' },
            { path: 'view', component: ViewPlacesComponent },
            { path: 'add', component: AddPlaceComponent },
            { path: ':id', component: EditPlaceComponent },
        ]
    },

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlacesRoutingModule { }
