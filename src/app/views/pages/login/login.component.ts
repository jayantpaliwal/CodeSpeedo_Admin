import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: any = FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    var formData:any = new FormData();
    formData.append('Email', this.loginForm.controls.email.value);
    formData.append('Password', this.loginForm.controls.password.value);
    this.api.loginUser(formData).subscribe(
      (result:any) =>{
        if(result.success == true){
          console.log(result);
          this.router.navigate(['/dashboard']);
          alert(result.message);
          const userDetails:any = {
            email: this.loginForm.controls.email.value,
            password: this.loginForm.controls.password.value 
          }
          localStorage.setItem('userDetails', JSON.stringify(userDetails));
          this.api.isAuthenticated = true;
          return true;
        }
        else{
          alert(`Login Failed, ${result.message}`);
          return false;
        }
       
      },(error:any) =>{
        console.log(error);
        alert(`Login Failed, ${error.message}`);
      }
    )
  }


}
