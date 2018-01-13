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
export class ViewPlacesComponent {

}


@Component({
    templateUrl: 'view-places.component.html',
})
export class UsersComponent implements OnInit, OnDestroy {
    places: Place[] = []
    totalItems: number
    searchFilter: string
    categoryFilter: string
    cities = cities
    categories = categories
    cityFilter: string
    currentPage: number
    keyUp$ = new Subject<string>()
    searchSubscription: Subscription
    constructor(
        private router: Router,
        private dataService: DataService,
        private sb: SnackBarService,
    ) { }

    ngOnInit() {
        this.fetchUsers({})
        this.searchSubscription =
            this.keyUp$.debounceTime(400).distinctUntilChanged().subscribe(() => {
                if (this.currentPage === 1) this.fetchUsers({})
                else this.currentPage = 1
            })
    }



    public fetchUsers({ page = 1 }) {
        const initialSub = this.dataService.getPlaces({
            categoryFilter: this.categoryFilter,
            cityFilter: this.cityFilter,
            searchFilter: this.searchFilter,
            skip: (page - 1) * 10
        }).first().subscribe(
            data => {
                this.places = data.places
                this.totalItems = data.count
            },
            error => this.sb.emitErrorSnackBar(error)
            )
    }


    onDeleteClick(selectedUser) {
        this.dataService.deletePlace(selectedUser._id).subscribe(
            data => this.fetchUsers({ page: this.currentPage }),
            error => this.sb.emitErrorSnackBar(error)
        )
    }


    onUpdateClick(item) {
        this.router.navigate(['/posting', item._id])
    }


    ngOnDestroy() {
        this.searchSubscription.unsubscribe()
    }



}
