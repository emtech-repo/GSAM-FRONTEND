import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

import { FormBuilder, FormGroup } from '@angular/forms';

import usersData from '../../assets/data/db.json';



declare function showSuccessToast(msg: any): any;
declare function showDangerToast(msg: any): any;
declare function showDangerToast(message: string, title?: string): void;


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
  userRole: string = '';

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


    const user = usersData.user.find(
      (u: any) => u.email === this.userEmail && u.password === this.userPassword
    );

    if (user) {
      // Check if the user has no role
      if (!user.role || user.role.trim() === '') {
        showDangerToast('Please contact Admin for activation', 'Inactive User');

      } else {
        showSuccessToast("Login Successful");
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.servive.isAuthenticated = true;
        console.log('Current User:', user);

        this.router.navigate(['/Dashboard']);
      }
    } else {
      showDangerToast('Invalid Credential');
    }

    this.servive.loader = false;
  }

  }





// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { SharedService } from '../shared.service';

// declare function showSuccessToast(msg: any): any;
// declare function showDangerToast(msg: any): any;

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent implements OnInit {
//   constructor(private servive: SharedService, private router: Router) {
//     servive.isAuthenticated = false;
//   }
//   changetype: any = true;
//   visible: any = true;
//   errorMessage: string = '';

//   UserList: any = [];

//   userEmail: string = '';
//   userPassword: string = '';

//   response: any = {};

//   ngOnInit(): void { }

//   replacer(i: any, val: any) {
//     if (i === 'Password') {
//       return undefined;
//     } else {
//       return val;
//     }
//   }
//   viewpassword() {
//     this.visible = !this.visible;
//     this.changetype = !this.changetype;
//   }
//   login() {
//     this.servive.loader = true;
//     var val = { Username: this.userEmail, Password: this.userPassword };

//     this.servive.getLogin(val).subscribe(
//       (res) => {
//         this.response = res;

//         if (this.response['status_code'] == 100) {
//           // Authentication successful
//           this.UserList = JSON.parse(this.response['message'])[0];
//           localStorage.setItem(
//             'currentUser',
//             JSON.stringify(this.UserList, this.replacer)
//           );
//           this.servive.isAuthenticated = true;
//           showSuccessToast("Login Successful");
//           this.router.navigate(['/Dashboard']); // Redirect to dashboard
//         } else {
//           // Authentication failed
//           showDangerToast('Invalid Credentials');
//         }
//       },
//       (error) => {
//         // Error handling
//         console.error('Error during authentication:', error);
//         showDangerToast('An error occurred during authentication');
//       }
//     );
//   }
// }



///corect
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { SharedService } from '../shared.service';

// declare function showSuccessToast(msg: any): any;
// declare function showDangerToast(msg: any): any;

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent implements OnInit {
//   constructor(private servive: SharedService, private router: Router) {
//     servive.isAuthenticated = false;
//   }
//   changetype: any = true;
//   visible: any = true;
//   errorMessage: string = '';

//   UserList: any = [];

//   userEmail: string = '';
//   userPassword: string = '';

//   response: any = {};

//   ngOnInit(): void { }

//   replacer(i: any, val: any) {
//     if (i === 'Password') {
//       return undefined;
//     } else {
//       return val;
//     }
//   }
//   viewpassword() {
//     this.visible = !this.visible;
//     this.changetype = !this.changetype;
//   }
//   login() {
//     this.servive.loader = true;
//     console.log('hello')
//     console.log(this.userEmail);
//     console.log(this.userPassword);
//     if (this.userEmail == 'Admin@gmail.com' && this.userPassword == '123456') {
//       showSuccessToast("Admin Login Successfully");
//       localStorage.setItem('currentUser', '23');
//       this.servive.isAuthenticated = true;
//       window.location.href = '/Dashboard'
//       // this.router.navigate(['/Dashboard']);
//       this.servive.loader = false;
//     } else {
//       showDangerToast('InValid Credential');
//       this.servive.loader = false;
//     }


//     var val = { Username: this.userEmail, Password: this.userPassword };
//     this.servive.getLogin(val).subscribe((res) => {
//       this.response = res;

//       if (this.response['status_code'] == 100) {
//         this.UserList = JSON.parse(this.response['message'])[0];

//         localStorage.setItem(
//           'currentUser',
//           JSON.stringify(this.UserList, this.replacer)
//         );

//         this.servive.isAuthenticated = true;
//       } else {
//         console.log(this.response);

//         alert(this.response['message']);
//       }
//     });
//   }
// }