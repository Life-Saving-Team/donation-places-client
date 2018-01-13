import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { PostingComponent } from './posting.component';
import { AddPlaceComponent } from './add-place/add-place.component';
import { EditPlaceComponent } from './edit-place/edit-place.component';

const routes: Routes = [
    { path: 'add', component: AddPlaceComponent },
    // { path: '/:id', component: EditPlaceComponent },
    // { path: '**', component: PostingComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostingRoutingModule { }
