import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service'
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import * as AOS from 'aos';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})
export class LoginComponent implements OnInit {
  // email: string;
  password: string;
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  constructor(private auth:AuthenticationService, private route:Router) { 
    // this.email = ''
    this.password = ''
    if (localStorage.getItem('token')){
      this.route.navigate(['/home'])
    }
  }

  ngOnInit(): void {
    AOS.init();
  }

  UserLogin(email:string , password:string){
    this.auth.login(email,password).subscribe(
      (data)=>  {
        localStorage.setItem("token" , data.auth_token) 
        this.route.navigate(['/home'])
    },
      (err) => alert("Wrong User name or password")
    );
  }


  


}