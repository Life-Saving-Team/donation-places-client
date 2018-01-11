import { DebugElement, OnInit } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { NavComponent } from './nav.component';
import { SharedModule } from '../shared.module';


describe('Success Component', () => {

    let comp: NavComponent;
    let fixture: ComponentFixture<NavComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let dataService: DataService
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, SharedModule],
            declarations: [],
            providers: [
                {provide: DataService, useValue: {}},
            
            ],
        });
        fixture = TestBed.createComponent(NavComponent);
        comp = fixture.componentInstance;
        dataService = fixture.debugElement.injector.get(DataService);
        el = fixture.debugElement.nativeElement
    });


    it("should load", () => {
        expect(comp).toBeTruthy()
    })

    it("should get connection Socket status", () => {
        dataService.isConnected = () => true
        expect(comp.isConnected()).toBe(true)
        dataService.isConnected = () => false
        expect(comp.isConnected()).toBe(false)
    })


    // describe('Html component color', ()=>{
    //     it("should be green when connected", () => {
    //         dataService.isConnected = () => true
    //         fixture.detectChanges()
    //         expect(el.querySelector('#connectionStatus').classList.contains('btn-success')).toBeTruthy()
    //         expect(el.querySelector('#connectionStatus').classList.contains('btn-danger')).toBeFalsy()
    //     })

    //     it("should be red when disconnected", () => {
    //         dataService.isConnected = () => false
    //         fixture.detectChanges()
    //         expect(el.querySelector('#connectionStatus').classList.contains('btn-danger')).toBeTruthy()
    //         expect(el.querySelector('#connectionStatus').classList.contains('btn-success')).toBeFalsy()
    //     })
    // })




})
