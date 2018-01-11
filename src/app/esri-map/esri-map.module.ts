import { MapCoreEventsHandler } from './services/event-handlers/map-core-events-handler';
import { SharedModule } from '../shared/shared.module';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { EsriLoaderService, EsriLoaderModule } from 'angular-esri-loader';
import { EsriMapComponent } from '../esri-map/esri-map.component';
import { EsriMapRoutingModule } from './esri-map-routing.module';
import { MapCoreService } from './services/map-core.service';
import { MapDoubleClickHandler } from './services/event-handlers/map-double-click-handler';

@NgModule({
    imports: [
        EsriMapRoutingModule,
        SharedModule,
        EsriLoaderModule,
    ],
    providers: [
        EsriLoaderService,
        MapCoreService,
        MapCoreEventsHandler,
        MapDoubleClickHandler,
    ],
    declarations: [
        EsriMapComponent,
    ],
})
export class EsriMapModule {

}
