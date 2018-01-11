import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EsriLoaderService } from 'angular-esri-loader';
import { arcGisApiUrl } from './esri.config';
import { MapCoreService } from './services/map-core.service';



@Component({
    selector: 'esri-map',
    templateUrl: './esri-map.component.html',
    styleUrls: ['./esri-map.component.css']
})
export class EsriMapComponent implements OnInit {

    @ViewChild('mapViewNode') private mapViewEl: ElementRef

    constructor(
        private esriLoader: EsriLoaderService, private mapCoreService: MapCoreService
    ) {

    }
    ngOnInit() {
        this.loadFromRemoteSource()
    }


    loadFromRemoteSource() {
        return this.esriLoader.load({ url: arcGisApiUrl }).then(() => this.loadMap());
    }


    loadModules() {
        return this.esriLoader.loadModules([
            'esri/Map',
            'esri/views/MapView',
            'esri/widgets/Track',
            'esri/widgets/Search',
            'esri/tasks/Locator',
            'esri/Graphic',
            'esri/geometry/Point',
            'esri/symbols/SimpleMarkerSymbol',
        ])
    }


    loadMap() {
        return this.loadModules().then((loadedModules) => {
            this.mapCoreService.loadMap(this.mapViewEl.nativeElement, loadedModules)
        });
    }








}





