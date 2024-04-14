import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

declare function showSuccessToast(msg: any): any;
declare function showDangerToast(msg: any): any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private servive: SharedService, private router: Router) {
    servive.isAuthenticated = false;
  }
  changetype: any = true;
  visible: any = true;
  errorMessage: string = '';

  UserList: any = [];

  userEmail: string = '';
  userPassword: string = '';

  response: any = {};

  ngOnInit(): void {}

  replacer(i: any, val: any) {
    if (i === 'Password') {
      return undefined;
    } else {
      return val;
    }
  }
  viewpassword() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
  login() {
    this.servive.loader=true;
    console.log('hello')
    console.log(this.userEmail);
    console.log(this.userPassword);
    if(this.userEmail =='Admin@gmail.com' && this.userPassword == '123456'){
      showSuccessToast("Admin Login Successfully");
      localStorage.setItem('currentUser','23');
      this.servive.isAuthenticated = true;
      window.location.href='/Dashboard'
      // this.router.navigate(['/Dashboard']);
      this.servive.loader=false;
    }else{
      showDangerToast('InValid Credential');
      this.servive.loader=false;
    }
    
 
    var val = { Username: this.userEmail, Password: this.userPassword };
    this.servive.getLogin(val).subscribe((res) => {
      this.response = res;

      if (this.response['status_code'] == 100) {
        this.UserList = JSON.parse(this.response['message'])[0];

        localStorage.setItem(
          'currentUser',
          JSON.stringify(this.UserList, this.replacer)
        );
        
        this.servive.isAuthenticated = true;
      } else {
        console.log(this.response);

        alert(this.response['message']);
      }
    });
  }
}
