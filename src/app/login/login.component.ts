import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { FormBuilder, FormGroup } from '@angular/forms';

declare function showSuccessToast(msg: any): any;
declare function showDangerToast(msg: any): any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formData: any;
  constructor(private servive: SharedService,
    private fb: FormBuilder,
    private router: Router) {
    servive.isAuthenticated = false;
  }
  changetype: any = true;
  visible: any = true;
  errorMessage: string = '';

  UserList: any = [];

  userEmail: string = '';
  userPassword: string = '';

  response: any = {};

  ngOnInit() {

    this.formData = this.fb.group({
      UserName: [''],
      password: ['']

    })


  }


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
    this.servive.loader = true;
    // console.log('hello')
    // console.log(this.userEmail);
    console.log(this.formData.value, "user log");
    // this.servive.getLogin(this.formData.value).subscribe(
    //   res =>{
    //     console.log(`${res} response`)
    //     // if(res.statusCode==200){
    //     //   window.location.href='/Dashboard'
    //     //   showSuccessToast(res.message);

    //     // }
    //   }
    // )

    // if(this.userEmail =='Admin@gmail.com' && this.userPassword == '123456'){
    //   showSuccessToast("Admin Login Successfully");
    //   localStorage.setItem('currentUser','23');
    //   this.servive.isAuthenticated = true;
    //   window.location.href='/Dashboard'
    //   // this.router.navigate(['/Dashboard']);
    //   this.servive.loader=false;
    // }else{
    //   showDangerToast('InValid Credential');
    //   this.servive.loader=false;
    // }


    //var val = { Username: this.userEmail, Password: this.userPassword };
    this.servive.getLogin(this.formData.value).subscribe((res) => {
      this.response = res;

      if (this.response.statusCode == 200) {
        this.router.navigate(['/Dashboard']);
        alert(this.response.message);
        //window.location.href='/Dashboard'
        this.servive.loader = false;
        // console.log(this.UserList, "jwt")
        this.UserList = this.response.result.jwtToken;
        //console.log(this.response.result.jwtToken,'response')
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
