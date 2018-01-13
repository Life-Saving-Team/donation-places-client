import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const paths: Routes = [
    { path: 'map', loadChildren: './esri-map/esri-map.module#EsriMapModule' },
    { path: 'success', loadChildren: './success/success.module#SuccessModule' },
    { path: 'places', loadChildren: './places/places.module#PlacesModule' },
    { path: '', redirectTo: 'map', pathMatch: 'full' },
    // { path: '**', redirectTo: 'map', pathMatch: 'full' }
]



@NgModule({
    imports: [RouterModule.forRoot(paths)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
