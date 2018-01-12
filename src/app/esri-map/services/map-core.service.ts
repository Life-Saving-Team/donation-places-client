import { Injectable } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { GraphicsService } from '../../shared/services/graphics.service';
import { UserService } from '../../shared/services/user.service';
import { addUIWidgets } from './map-ui-widgets';
import { center } from '../esri.config';
import { MapCoreEventsHandler } from './event-handlers/map-core-events-handler';

@Injectable()
export class MapCoreService {
    constructor(private dataService: DataService, private graphicsService: GraphicsService,
        private mapCoreEventsHandler: MapCoreEventsHandler) { }


    loadMap(mapDomElement, loadedModules) {
        const [Map, MapView, Track, Search, Locator, Graphic, Point, SimpleMarkerSymbol] = loadedModules
        const map = new Map({ basemap: 'osm' });
        const view = new MapView({
            container: mapDomElement,
            map,
            center: center,
            zoom: 10,
        });

        // this.dataService.getNearByLocations().subscribe(
        //     data => this.graphicsService.setGraphicsFromData(view, SimpleMarkerSymbol, Point, Graphic, data),
        //     error => console.log('Problem with socket connector')
        // )

        addUIWidgets(view, Track, Search)
        this.mapCoreEventsHandler.assignMapEventHandlers(view, Locator)
    }




}

