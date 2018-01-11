import { EsriLoaderService } from 'angular-esri-loader';
import { SharedModule } from '../shared/shared.module';
import { EsriMapComponent } from './esri-map.component';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EsriMapModule } from './esri-map.module';
import { MapCoreService } from './services/map-core.service';


describe('EsriMapComponent', () => {

    let comp: EsriMapComponent;
    let fixture: ComponentFixture<EsriMapComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let sb
    let userService
  
    let userServiceStub = {
        saveLocation(long, lat, address){

        },
    }
   
 
    let EsriLoaderServiceStub = {
        load(obj){
            return Promise.resolve(1)
        },
        loadModules(x){
            return Promise.resolve(1)
        }
    }
    let mapCoreServiceStub = {
        loadMap(element, modules){
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [EsriMapModule],
            declarations: [],
            providers: [
                { provide: EsriLoaderService, useValue: EsriLoaderServiceStub },
                { provide: MapCoreService, useValue: mapCoreServiceStub },
            ],
        });
        fixture = TestBed.createComponent(EsriMapComponent);
        comp = fixture.componentInstance;

    });


    it("should load without any errors", () => {
        comp.ngOnInit()
        fixture.detectChanges()
        expect(comp).toBeTruthy()
    })

 

})
