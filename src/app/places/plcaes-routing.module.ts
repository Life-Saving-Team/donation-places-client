import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { ViewPlacesComponent } from './view-places/view-places.component';

const routes: Routes = [
    { path: '', component: ViewPlacesComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlacesRoutingModule { }
