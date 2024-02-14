import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Login, LoginResponse } from 'src/app/Interfaces/login.interface';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credantialChecker!: boolean;
  errorMessage = "";

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthserviceService,
    private router: Router,
    private userService: UserService
  ) { }

  loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required]
  });


  login() {
    if(this.loginForm.valid){
      const confirmFormValue: Login = {
        email: this.loginForm.get('email')!.value || "",
        password: this.loginForm.get('password')!.value || "",
      };

      this.userService.login(confirmFormValue).subscribe({
        next: (response) => {
          if(response.token) {
            const allowAccess = response;
            localStorage.setItem("token", allowAccess.token);
            localStorage.setItem("name", allowAccess.name);
            localStorage.setItem("email", allowAccess.email);
  
            this.authService.setAuthenticatedUser(true);
            this.router.navigate(['/admin']);
          }
         
        },
        error: (error) => {
          this.credantialChecker = true;
          this.errorMessage = error.error.message;
        }
      })
    }

  }




}

/*

const response = await this.userService.login(<Login>this.loginForm.value);
        localStorage.setItem("token", response.token);
        localStorage.setItem("name", response.name);
  
        console.log(response)
        this.authService.setAuthenticatedUser(true);
        this.router.navigate(['/admin']);
        
*/

