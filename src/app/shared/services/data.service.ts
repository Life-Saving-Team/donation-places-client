import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SnackBarService } from './snackbar.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../environments/environment';
@Injectable()
export class DataService {
    private nearbyPlacesStore: any[]

    // private requestHeaders = new Headers({ 'Content-Type': 'application/json' });
    // private requestOptions = new RequestOptions({ headers: this.requestHeaders });
    private placesEndPoint
    constructor(private http: HttpClient) {
        if (environment.production) this.placesEndPoint = '/donation-places'
        else this.placesEndPoint = 'http://localhost:3000/donation-places'
    }


    getPlaces({ skip = 0, searchFilter, categoryFilter, cityFilter }) {
        let params = new HttpParams()
        params = params.append('skip', skip.toString())
        if (searchFilter) params = params.append('searchFilter', searchFilter);
        if (cityFilter) params = params.append('cityFilter', cityFilter)
        return this.http.get(this.placesEndPoint, { params }).catch(err => this.handleError(err));
    }


    getNearbyPlaces(longitude?, latitude?) {
        return this.http.get(`${this.placesEndPoint}/nearby?latitude=${latitude}&longitude=${longitude}`).catch(this.handleError);
    }


    deletePlace(id) {
        return this.http.delete(`${this.placesEndPoint}/${id}`).catch(this.handleError);
    }


    updatePlace(id, data) {
        return this.http.put(`${this.placesEndPoint}/${id}`, data).catch(this.handleError);
    }



    addPlace(item) {
        return this.http.post(`${this.placesEndPoint}`, item).catch(this.handleError);
    }

    getPlaceInfo(id) {
        return this.http.get(`${this.placesEndPoint}/${id}`).catch(this.handleError);
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


