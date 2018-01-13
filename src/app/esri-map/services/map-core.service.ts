import { Injectable } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { GraphicsService } from '../../shared/services/graphics.service';
import { addUIWidgets } from './map-ui-widgets';
import { center } from '../esri.config';
import { MapCoreEventsHandler } from './event-handlers/map-core-events-handler';

@Injectable()
export class MapCoreService {
    constructor(
         private graphicsService: GraphicsService,
        private mapCoreEventsHandler: MapCoreEventsHandler
    ) { }


    loadMap(mapDomElement, loadedModules) {
        const [Map, MapView, Track, Search, Locator, Graphic, Point, SimpleMarkerSymbol] = loadedModules
        const map = new Map({ basemap: 'osm' });
        const view = new MapView({
            container: mapDomElement,
            map,
            center: center,
            zoom: 10,
        });

        this.graphicsService.initialize({Point, Graphic, SimpleMarkerSymbol, view})

        addUIWidgets(view, Track, Search)
        this.mapCoreEventsHandler.assignMapEventHandlers(view, Locator)
    }






}

