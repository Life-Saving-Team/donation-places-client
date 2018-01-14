import { Injectable } from '@angular/core';


@Injectable()
export class GraphicsService {
    view
    SimpleMarkerSymbol
    Point
    Graphic
    purpleCirleMarker
    orangeCirleMarker
    greenCirleMarker
    redCirleMarker

    private popupTemplate = {
        actions: [],
        title: '{name}',
        content: [{
            type: 'fields',
            fieldInfos: [{
                fieldName: 'Name'
            }, {
                fieldName: 'Address'
            }, {
                fieldName: 'Category'
            }, {
                fieldName: 'City'
            }, {
                fieldName: 'isPrivate'
            }]
        }]
    }
    initialize({ view, SimpleMarkerSymbol, Point, Graphic }) {
        this.view = view
        this.SimpleMarkerSymbol = SimpleMarkerSymbol
        this.Point = Point
        this.Graphic = Graphic
        this.purpleCirleMarker = new this.SimpleMarkerSymbol({ color: [107, 0, 232], outline: { color: [255, 255, 255], width: 2 } });
        this.orangeCirleMarker = new this.SimpleMarkerSymbol({ color: [232, 124, 4], outline: { color: [255, 255, 255], width: 2 } });
        this.greenCirleMarker = new this.SimpleMarkerSymbol({ color: [23, 169, 37], outline: { color: [255, 255, 255], width: 2 } });
        this.redCirleMarker = new this.SimpleMarkerSymbol({ color: [255, 0, 0, 0.92], outline: { color: [255, 255, 255], width: 2 } });
    }

    setGraphicsFromData(data) {

        const newGraphics = data.map((place, index) => {
            return new this.Graphic({
                geometry: new this.Point({
                    longitude: place.location.coordinates[0],
                    latitude: place.location.coordinates[1]
                }),
                symbol: place.category === 'Mall' ? this.redCirleMarker :
                    place.category === 'Mosque' ? this.greenCirleMarker :
                        place.category === 'Hospital' ? this.purpleCirleMarker :
                            place.category === 'Company' ? this.orangeCirleMarker : this.purpleCirleMarker,
                attributes: {
                    'Name': place.name,
                    'Address': place.address,
                    'Category': place.category,
                    'City': place.city,
                    'isPrivate': place.isPrivate,
                },
                popupTemplate: this.popupTemplate
            });
        })
        this.view.graphics.removeAll()
        this.view.graphics.addMany(newGraphics)
    }


    showAddingPopup(view, mapPoint, address?) {
        // Get the coordinates of the click on the view
        const lat = Math.round(mapPoint.latitude * 1000) / 1000;
        const lon = Math.round(mapPoint.longitude * 1000) / 1000;
        view.popup.actions = [{
            title: 'Confirm Location',
            id: 'show-add-modal',
            className: 'text-danger'
        }]
        view.popup.open({
            // Set the popup's title to the coordinates of the location
            title: address ? address : 'No address was found for this location',
            location: mapPoint // Set the location of the popup to the clicked location
        });

        view.popup.content = '[' + lon + ', ' + lat + ']'
    }



}


