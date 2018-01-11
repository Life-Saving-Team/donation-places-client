import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
    userData
    userId
    constructor() {
    }

    saveLocation(longitude, latitude, address) {
        if (!this.userData) {
            this.userData = {}
        }
        this.userData.longitude = longitude
        this.userData.latitude = latitude
        this.userData.address = address

    }


    clearData(){
        this.userData = null
        this.userId=null
    }

}

