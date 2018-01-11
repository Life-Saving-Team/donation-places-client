import { Injectable } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { debounce } from '../utility';
import { addShowHiddenItemsHandler } from './map-show-hidden-handler';
import { MapDoubleClickHandler } from './map-double-click-handler';

@Injectable()
export class MapCoreEventsHandler {
    constructor(private dataService: DataService, private mapDoubleClickHandler: MapDoubleClickHandler) { }

    private askForData(view) {
        return this.dataService.getNearbyDonors(view.center.longitude, view.center.latitude)
    }

    assignMapEventHandlers(view, Locator) {
        console.log(view);

        view.on('drag', debounce(() => this.askForData(view), 25))
        view.on('mouse-wheel', debounce(() => this.askForData(view), 25))
        view.on('hold', debounce(() => this.askForData(view), 25))
        this.mapDoubleClickHandler.implement(view, Locator)
        addShowHiddenItemsHandler(view)
        view.then((x) => this.askForData(view));
    }

}


