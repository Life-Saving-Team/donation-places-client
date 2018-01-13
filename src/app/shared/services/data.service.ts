import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SnackBarService } from './snackbar.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'
import { environment } from '../../../environments/environment';
@Injectable()
export class DataService {
    private nearbyPlacesStore: any[]

    private requestHeaders = new Headers({ 'Content-Type': 'application/json' });
    private requestOptions = new RequestOptions({ headers: this.requestHeaders });
    private placesEndPoint
    constructor(private http: Http) {
        if (environment.production) this.placesEndPoint = '/donation-places'
        else this.placesEndPoint = 'http://localhost:3000/donation-places'
    }


    getNearbyPlaces(longitude?, latitude?) {
        return this.http.get(`${this.placesEndPoint}?latitude=${latitude}&longitude=${longitude}`)
            .map(res => {
                return 'OK'
            })
            .catch(this.handleError);
    }


    deletePlace(id) {
        return this.http.delete(`${this.placesEndPoint}/${id}`)
            .map(res => {
                return 'OK'
            })
            .catch(this.handleError);
    }


    updatePlace(id, data) {
        return this.http.put(`${this.placesEndPoint}/${id}`, data, this.requestOptions)
            .map(res => {
                return res.json()
            })
            .catch(this.handleError);
    }



    addPlace(item) {
        return this.http.post(`${this.placesEndPoint}`, item, this.requestOptions)
            .map(res => {
                return res.json()
            })
            .catch(this.handleError);
    }

    getPlaceInfo(id) {
        return this.http.get(`${this.placesEndPoint}/${id}`)
            .map(res => {
                const item = res.json()
                item.longitude = item.location.coordinates[0]
                item.latitude = item.location.coordinates[1]
                return item
            })
            .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        console.log(error);
        let message: string;
        let statusCode: number;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            statusCode = error.status
            message = err;
        } else {
            message = error.message ? error.message : error.toString();
        }
        // if (error.status === 403 || error.status === 401) {
        //     this.sb.emitErrorSnackBar(error)
        //     this.router.navigate(['login'])
        // }
        return Observable.throw(message);
    }







}


