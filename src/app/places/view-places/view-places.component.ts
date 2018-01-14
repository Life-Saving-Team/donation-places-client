import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Place } from '../../shared/models/place';
import { Subject } from 'rxjs/RX';
import { SnackBarService } from '../../shared/services/snackbar.service';
import { DataService } from '../../shared/services/data.service';
import { Subscription } from 'rxjs/Subscription';
import { cities } from '../../config/cities';
import { categories } from '../../config/categories';

@Component({
    selector: 'view-places',
    templateUrl: 'view-places.component.html',
})
export class ViewPlacesComponent implements OnInit, OnDestroy {
    places: Place[] = []
    totalItems: number
    searchFilter = ''
    categoryFilter = ''
    cityFilter = ''
    cities = cities
    categories = categories
    currentPage: number
    keyUp$ = new Subject<string>()
    searchSubscription: Subscription
    constructor(
        private router: Router,
        private dataService: DataService,
        private sb: SnackBarService,
    ) { }

    ngOnInit() {
        this.fetchPlaces({})
        this.searchSubscription =
            this.keyUp$.debounceTime(400).distinctUntilChanged().subscribe(() => this.fetchConsideringPaging())
    }


    public fetchConsideringPaging() {
        if (this.currentPage === 1) this.fetchPlaces({})
        else this.currentPage = 1
    }

    public fetchPlaces({ page = 1 }) {
        const initialSub = this.dataService.getPlaces({
            categoryFilter: this.categoryFilter,
            cityFilter: this.cityFilter,
            searchFilter: this.searchFilter,
            skip: (page - 1) * 10
        }).subscribe(
            data => {
                this.places = data.places
                this.totalItems = data.count
            },
            error => this.sb.emitErrorSnackBar(error)
            )
    }


    onDeleteClick(selectedUser) {
        this.dataService.deletePlace(selectedUser._id).subscribe(
            data => this.fetchPlaces({ page: this.currentPage }),
            error => this.sb.emitErrorSnackBar(error)
        )
    }


    onUpdateClick(item) {
        this.router.navigate(['/places', item._id])
    }


    ngOnDestroy() {
        this.searchSubscription.unsubscribe()
    }



}
