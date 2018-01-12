import { Injectable } from '@angular/core';


@Injectable()
export class GraphicsService {
    view
    SimpleMarkerSymbol
    Point
    Graphic

    initialize({view,  SimpleMarkerSymbol,   Point,   Graphic}) {
        this.view = view
        this.SimpleMarkerSymbol = SimpleMarkerSymbol
        this.Point = Point
        this.Graphic = Graphic
    }

    setGraphicsFromData(data) {
        const markerSymbol = new this.SimpleMarkerSymbol({
            color: [107, 0, 232],
            outline: { // autocasts as new SimpleLineSymbol()
                color: [255, 255, 255],
                width: 2
            }
        });
        const newGraphics = data.map((place, index) => {
            return new this.Graphic({
                geometry: new this.Point({
                    longitude: place.location.coordinates[0],
                    latitude: place.location.coordinates[1]
                }),
                symbol: markerSymbol,
                attributes: {
                    'Name': place.name,
                    'Address': place.address,
                    'Category': place.category,
                    'Governerate': place.governerate,
                    'isPrivate': place.isPrivate,
                },
                popupTemplate: {
                    actions: [{
                        title: 'Show phone and email',
                        id: 'show-hidden',
                    }],
                    title: '{firstName} {lastName}',
                    content: [{
                        type: 'fields',
                        fieldInfos: [{
                            fieldName: 'Name'
                        }, {
                            fieldName: 'Address'
                        }, {
                            fieldName: 'Category'
                        }, {
                            fieldName: 'Governerate'
                        }, {
                            fieldName: 'isPrivate'
                        }]
                    }]
                }
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


