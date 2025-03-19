import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { appConfig } from '../../app.config';
import { ApiService } from '../../api.service';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterOutlet,CommonModule]
,  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  http=inject(HttpClient)
  service=inject(ApiService)
  router=inject(Router)
  loginObj: any=     
      {};

  
onLogin()
{
  debugger;
/*  this.service.LoginEmployee(this.loginObj).subscribe(
    {
      next: (response) => {
        localStorage.setItem('employeeApp', JSON.stringify(response))
            this.router.navigateByUrl("dashboard")
      },
      error: (error: any) => {
        console.error('Error details:', error); // Inspect the full error response
      },
    });
*/

  
const employeeData = {
  Email: this.loginObj.Email,
  Password: this.loginObj.PassWord
};
    
this.service.LoginEmployee(this.loginObj).subscribe(
  (res: any) => {
    if (res.status) {
      // Successful response handling
      localStorage.setItem('employeeApp',res.token);
    //  localStorage.setItem('employeeApp', JSON.stringify({
   //     token: res.token
     //   roles: res.roles
  //    }));
      this.router.navigateByUrl("dashboard");
    } else {
      // Handle failure or error message
      console.log('Error:', res.message);
      alert(res.message || 'Login failed. Please try again.');
    }
  },
  (error) => {
    // Handle HTTP or server errors
    console.error('HTTP Error:', error);
    alert('An error occurred during login. Please check the server or your inputs.');
  }
);
}
onAccount()
{
  this.router.navigateByUrl("accountCreation");
}

onForgot()
{
  
}
}
