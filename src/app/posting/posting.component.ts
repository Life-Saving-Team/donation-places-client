import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { UserService } from '../shared/services/user.service';
import { Component, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { globalValidators } from '../shared/global-validators';
import { SnackBarService } from '../shared/services/snackbar.service';

@Component({
    selector: 'posting',
    templateUrl: 'posting.component.html',
})
export class PostingComponent {
    isEdit: boolean
    form: FormGroup
    bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']

    constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute,
        private dataService: DataService, private router: Router, private userService: UserService,
        private sb: SnackBarService) { 
            this.grabIdAndGetInfo()
        }

    grabIdAndGetInfo(){
        if(this.activatedRoute.snapshot.url[0]){
            this.isEdit =true
            this.getDonorInfo(this.activatedRoute.snapshot.url[0].path)
        }
        else if(this.userService.userId){
            this.isEdit =true
            this.buildForm()
        } else {
            this.isEdit =false
            this.buildForm()
        }
        
        
    
    }
  
    private getDonorInfo(id) {
        this.dataService.getDonorInfo(id).subscribe(
            data => {
                this.userService.userId = id
                this.userService.userData = data
                this.buildForm()
            },
            error => {
                this.sb.emitErrorSnackBar("This account is currently non-existant")
                this.router.navigate(['/map'])
            }
        )
    }

    onRemove(){
        return this.dataService.deleteDonor(this.userService.userId).subscribe(
            data => {
                this.userService.clearData()
                this.form.reset()
                this.sb.emitSuccessSnackBar("You have successfully deleted your info")
                this.router.navigate(['/map'])
            },
            error => console.log(error)
        )
    }
    onSubmit(formData) {
        if (this.userService.userId) return this.dataService.updateDonor(this.userService.userId, formData).subscribe(
            success => {
                this.router.navigate(['/success'])
            },
            error => console.log(error)
        )
        else return this.dataService.addDonor(formData).subscribe(
            data => {
                this.userService.userId = data._id
                this.router.navigate(['/success'])
            },
            error => console.log(error)
        )
    }


    onChangeLocationRequest() {
        this.router.navigate(['/map'])
    }


    buildForm() {

        if (this.userService.userData){
            this.form = this.fb.group({
                firstName: [this.userService.userData.firstName || '', Validators.required],
                lastName: [this.userService.userData.lastName || '', Validators.required],
                email: [this.userService.userData.email || '', globalValidators.mailFormat],
                telephone: [this.userService.userData.telephone || '', globalValidators.telephoneFormat],
                bloodGroup: [this.userService.userData.bloodGroup || '', Validators.required],
                longitude: [this.userService.userData.longitude || '', globalValidators.longitudeFormat],
                latitude: [this.userService.userData.latitude || '', globalValidators.latitudeFormat],
                address: [this.userService.userData.address || '',Validators.required],
            })
        }
        else {  
            this.form = this.fb.group({
                firstName: [  '', Validators.required],
                lastName: [ '', Validators.required],
                email: ['', globalValidators.mailFormat],
                telephone: [  '', globalValidators.telephoneFormat],
                bloodGroup: ['', Validators.required],
                longitude: [  '', globalValidators.longitudeFormat],
                latitude: [ '', globalValidators.latitudeFormat],
                address: ['',Validators.required],
            })

        }
        
    }


    isIncorrectMailFormat(control) {
        return this.form.get(control).hasError('incorrectMailFormat')
    }
    isIncorrectTelephoneFormat(control) {
        return this.form.get(control).hasError('incorrectTelephoneFormat')
    }
    isIncorrectLongitudeFormat(control) {
        return this.form.get(control).hasError('incorrectLongitudeFormat')
    }
    isIncorrectLatitudeFormat(control) {
        return this.form.get(control).hasError('incorrectLatitudeFormat')
    }




}
