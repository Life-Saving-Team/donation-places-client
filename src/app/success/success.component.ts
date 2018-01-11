import { UserService } from '../shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'success',
    templateUrl: 'success.component.html',
})
export class SuccessComponent {
    id: string
    url= window.location.origin
    constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {
    }
    ngOnInit(){
        this.id= this.userService.userId
        if(!this.id) this.router.navigate(['/map'])
        
    }


}
