import { UserService } from './user.service';
import { async, getTestBed, TestBed } from '@angular/core/testing';

describe('Service: User Service', () => {
    let service: UserService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
               UserService
            ]
        });
        const testbed = getTestBed();
        service = testbed.get(UserService);
    });


 
    it('should save location of map data points if user data is unavailable', () => {
        service.userData=null
       service.saveLocation(30,30, '30 Street A')
        
    });

    it('should save location of map data points if user data is available', () => {
        service.userData = {data:1}
        service.saveLocation(30,30, '30 Street A')
         
     });

    it('should show popup given the view and map point with no address', () => {
        service.clearData()
        
    });



 });