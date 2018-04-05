import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SnackBarService } from './snackbar.service';
import 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../environments/environment';

@Injectable()
export class DataService {

    constructor(private http: HttpClient) {  }

    getPlaces({ skip , searchFilter, categoryFilter, cityFilter }) {
        let params = new HttpParams()
        params = params.append('skip', skip.toString())
        if (skip) params = params.append('skip', skip);
        if (categoryFilter) params = params.append('categoryFilter', categoryFilter);
        if (searchFilter) params = params.append('searchFilter', searchFilter);
        if (cityFilter) params = params.append('cityFilter', cityFilter)
        return this.http.get(environment.apiUrl, { params }).catch(err => this.handleError(err));
    }


    getNearbyPlaces(longitude?, latitude?) {
        return this.http.get(`${environment.apiUrl}/nearby?latitude=${latitude}&longitude=${longitude}`).catch(this.handleError);
    }


    deletePlace(id) {
        return this.http.delete(`${environment.apiUrl}/${id}`).catch(this.handleError);
    }


    updatePlace(id, data) {
        return this.http.put(`${environment.apiUrl}/${id}`, data).catch(this.handleError);
    }



    addPlace(item) {
        return this.http.post(`${environment.apiUrl}`, item).catch(this.handleError);
    }

    getPlaceInfo(id) {
        return this.http.get(`${environment.apiUrl}/${id}`).catch(this.handleError);
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


