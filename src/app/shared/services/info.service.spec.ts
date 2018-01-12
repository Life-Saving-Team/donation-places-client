import { SavedPlace } from './user.service';
import { async, getTestBed, TestBed } from '@angular/core/testing';

describe('Service: User Service', () => {
    let service: SavedPlace;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
               SavedPlace
            ]
        });
        const testbed = getTestBed();
        service = testbed.get(SavedPlace);
    });


 
    it('should save location of map data points if user data is unavailable', () => {
        service.placeData=null
       service.saveLocation(30,30, '30 Street A')
        
    });

    it('should save location of map data points if user data is available', () => {
        service.placeData = {data:1}
        service.saveLocation(30,30, '30 Street A')
         
     });

    it('should show popup given the view and map point with no address', () => {
        service.clearData()
        
    });



 });