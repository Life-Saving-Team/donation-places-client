import { Injectable } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { debounce } from '../utility';
import { addShowHiddenItemsHandler } from './map-show-hidden-handler';
import { MapDoubleClickHandler } from './map-double-click-handler';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/throttleTime';
import { GraphicsService } from '../../../shared/services/graphics.service';

@Injectable()
export class MapCoreEventsHandler {
    constructor(
        private dataService: DataService,
        private mapDoubleClickHandler: MapDoubleClickHandler,
        private graphicsService: GraphicsService

    ) { }


    assignMapEventHandlers(view, Locator) {
        const obs = new Subject()
        view.on('drag', (x) => obs.next(1))
        view.on('mouse-wheel', (x) => obs.next(1))
        view.on('hold', (x) => obs.next(1))

        obs.throttleTime(500).flatMap(() => this.dataService.getNearbyPlaces(view.center.longitude, view.center.latitude)).subscribe(
            data => this.graphicsService.setGraphicsFromData(data)
        )

        this.mapDoubleClickHandler.implement(view, Locator)
        addShowHiddenItemsHandler(view)
        view.then((x) => obs.next(1));
    }

}


