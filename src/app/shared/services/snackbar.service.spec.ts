import { SnackBarService } from './snackbar.service';
import { async, getTestBed, TestBed } from '@angular/core/testing';
import { MdSnackBar } from '@angular/material';

describe('Service: Snack bar Service', () => {
    let service: SnackBarService;
    let mockMdSnackBar = {
        open(message, actionText, config){

        }
    }
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
               SnackBarService,
               {provide: MdSnackBar, useValue: mockMdSnackBar}
            ]
        });
        const testbed = getTestBed();
        service = testbed.get(SnackBarService);
    });


 
    it('should emit error snack bar when message argumnet is not provided', () => {
        service.emitErrorSnackBar()
    });
    it('should emit error snack bar when message argumnet provided', () => {
        service.emitErrorSnackBar("Error!")
    });
    it('should emit error snack bar when action text is not provided', () => {
        service.emitErrorSnackBar(null)
    });
    it('should emit error snack bar when action text is provided', () => {
        service.emitErrorSnackBar(null, "Ok")
    });

    it('should emit error snack bar when config is provided', () => {
        service.emitErrorSnackBar(null, null, {extraClasses:['ds', 'fd'], duration:500})
    });
    it('should emit error snack bar when config is not provided', () => {
        service.emitErrorSnackBar(null, null)
    });

    



     it('should emit Success snack bar when message argumnet is not provided', () => {
        service.emitSuccessSnackBar()
    });
    it('should emit Success snack bar when message argumnet provided', () => {
        service.emitSuccessSnackBar("Success!")
    });
    it('should emit Success snack bar when action text is not provided', () => {
        service.emitSuccessSnackBar(null)
    });
    it('should emit Success snack bar when action text is provided', () => {
        service.emitSuccessSnackBar(null, "Ok")
    });

    it('should save location of map data points if user data is available', () => {
        service.emitSuccessSnackBar()
         
     });

     it('should emit Success snack bar when config is provided', () => {
        service.emitSuccessSnackBar(null, null, {extraClasses:['ds', 'fd'], duration:500})
    });
    it('should emit Success snack bar when config is not provided', () => {
        service.emitSuccessSnackBar(null, null)
    });
   



 });