import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SavedPlaceService } from '../../../shared/services/saved-place.service';
import { GraphicsService } from '../../../shared/services/graphics.service';
import { locatorUrl } from '../../esri.config';

@Injectable()
export class MapDoubleClickHandler {
    constructor(private router: Router, private savedPlaceService: SavedPlaceService, private graphicsService: GraphicsService) { }

    implement(view, Locator) {
        const self = this;
        const locatorTask = new Locator({ url: locatorUrl });
        view.on('double-click', function (event) {
            event.stopPropagation();
            const longitude = event.mapPoint.longitude;
            const latitude = event.mapPoint.latitude;
            let address = 'none';

            locatorTask.locationToAddress(event.mapPoint)
                .then(response => {
                    address = response.address
                    self.showPopup(view, event.mapPoint, response.address)
                })
                // .otherwise(err => self.showPopup(view, event.mapPoint, address));


            view.popup.on('trigger-action', (e) => {
                if (e.action.id === 'show-add-modal') {
                    self.savedPlaceService.saveLocation(longitude, latitude, address);
                    self.router.navigate(['/places/add']);
                }
            });

        });


    }

    private showPopup(view, mapPoint, address) {
        this.graphicsService.showAddingPopup(view, mapPoint, address);
    }






}