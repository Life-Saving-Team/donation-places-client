import { Injectable } from '@angular/core';

@Injectable()
export class SavedPlaceService {
    placeData
    placeId

    constructor() {
    }

    saveLocation(longitude, latitude, address) {
        if (!this.placeData) {
            this.placeData = {}
        }
        this.placeData.longitude = longitude
        this.placeData.latitude = latitude
        this.placeData.address = address

    }


    clearData() {
        this.placeData = null
        this.placeId = null
    }

}

