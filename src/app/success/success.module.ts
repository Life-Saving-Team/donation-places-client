// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { SuccessComponent } from './success.component';
import { SharedModule } from '../shared/shared.module';
import { SuccessRoutingModule } from './success-routing.module';

@NgModule({
    imports: [
        SuccessRoutingModule,
        SharedModule,
    ],
    declarations: [
        SuccessComponent,
    ],
    exports: [
        SuccessComponent,
    ]
})
export class SuccessModule {

}
