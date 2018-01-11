import { Injectable } from '@angular/core';


@Injectable()
export class GraphicsService {


    setGraphicsFromData(view, SimpleMarkerSymbol, Point, Graphic, data) {


        var markerSymbol = new SimpleMarkerSymbol({
            color: [107, 0, 232],
            outline: { // autocasts as new SimpleLineSymbol()
                color: [255, 255, 255],
                width: 2
            }
        });

        const newGraphics = data.map((person, index) => {
            return new Graphic({
                geometry: new Point({
                    longitude: person.location.coordinates[0],
                    latitude: person.location.coordinates[1]
                }),
                symbol: markerSymbol,
                attributes: {
                    "First Name": person.firstName,
                    "Last Name": person.lastName,
                    "Blood Group": person.bloodGroup,
                    "Phone Number": `<a id="telephone-${index}" data="${person.telephone}"  > Hidden </a> `,
                    "Email": `<a id="email-${index}" data="${person.email}" > Hidden </a> `,
                },
                popupTemplate: {
                    actions: [{
                        title: "Show phone and email",
                        id: "show-hidden",
                    }],
                    title: "{firstName} {lastName}",
                    content: [{
                        type: "fields",
                        fieldInfos: [{
                            fieldName: "First Name"
                        }, {
                            fieldName: "Last Name"
                        }, {
                            fieldName: "Blood Group"
                        }, {
                            fieldName: "Phone Number"
                        }, {
                            fieldName: "Email"
                        }]
                    }]
                }
            });
        })
        view.graphics.removeAll()
        view.graphics.addMany(newGraphics)
    }


    showAddingPopup(view, mapPoint, address?) {
        // Get the coordinates of the click on the view
        const lat = Math.round(mapPoint.latitude * 1000) / 1000;
        const lon = Math.round(mapPoint.longitude * 1000) / 1000;
        view.popup.actions = [{
            title: "Confirm Location",
            id: "show-add-modal",
            className: "text-danger"
        }]
        view.popup.open({
            // Set the popup's title to the coordinates of the location
            title: address? address : "No address was found for this location" ,
            location: mapPoint // Set the location of the popup to the clicked location
        });
        
         view.popup.content = "[" + lon + ", " + lat + "]"
        
        
    }



}


