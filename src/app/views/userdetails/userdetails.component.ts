import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { filter } from 'rxjs';


@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.scss'
})
export class UserdetailsComponent {

  userDetails:any;

  constructor(private route: ActivatedRoute, private router: Router){
    console.log(this.route);
    
    // this.userDetails = this.router.getCurrentNavigation()?.extras.state;
    // console.log(this.userDetails);
    // this.router.events
    //   .pipe(
    //     filter((event) => event instanceof NavigationEnd)
    //   )
    //   .subscribe(() => {
        this.userDetails = this.router.getCurrentNavigation()?.extras.state;
      // });
    }
    
}
