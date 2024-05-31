// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { SharedService } from '../shared.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 

// declare function showSuccessToast(msg: string): void;
// declare function showDangerToast(msg: string, title?: string): void;
// // Import Validators for email validation

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent implements OnInit {
//   formData!: FormGroup;
//   visible: boolean = true;
//   showPassword: boolean = false;
//   changetype: boolean = true;
  
//   errorMessage: string = '';
//   Email: string = ''; // Declare email property
//   Password: string = ''; // Declare password property

//   constructor(
//     private service: SharedService,
//     private fb: FormBuilder,
//     private router: Router
//   ) {
//     service.isAuthenticated = false;
//   }

//   ngOnInit() {
//     this.formData = this.fb.group({
//       Elementmail: ['', [Validators.required, Validators.email]],
//       Password: ['', Validators.required],
//     });
//   }
//   showpassword() {
//     this.visible = !this.visible;
//     this.changetype = !this.changetype;
//   }
//   // viewpassword() {
//   //   this.visible = !this.visible;
//   // }

//   login() {
//     if (this.formData.valid) {
//       console.log('Logging in with:', this.formData.value);

//       this.service.loader = true;
//       this.service.getLogin(this.formData.value)
//         .subscribe((res) => {
//           console.log('Login response:', res);
//           this.service.loader = false;

//           if (res.statusCode == 200) {
//             this.router.navigate(['/Dashboard']);
//             alert(res.message);
//             localStorage.setItem('currentUser', JSON.stringify(res.result.jwtToken));
//             this.service.isAuthenticated = true;
//           } else {
//             alert(res.message);
//           }
//         });
//     } else {
//       this.formData.markAllAsTouched(); // Mark all fields as touched to trigger validation messages
//       showDangerToast('Please fill in all fields');
//     }
//   }

//   togglePasswordVisibility() {
//     this.showPassword = !this.showPassword;
//   }

// }



//////////////////

// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { SharedService } from '../shared.service';

// import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import Validators for email validation


// declare function showSuccessToast(msg: any): any;
// declare function showDangerToast(msg: any): any;

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent implements OnInit {
//   formData: any;
//   constructor(private servive: SharedService,
//     private fb: FormBuilder,
//     private router: Router) {
//     servive.isAuthenticated = false;
//   }
//   changetype: any = true;
//   visible: any = true;
//   errorMessage: string = '';

//   UserList: any = [];

//   email: string = '';
//   password: string = '';

//   response: any = {};

//   ngOnInit() {

//     // Initialize formData with form controls and validators
//     this.formData = this.fb.group({
//       email: ['', [Validators.required, Validators.email]], // Add validators for email
//       password: ['', Validators.required] // Add validators for password
//     })


//   }


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
//     // console.log('hello')
//     // console.log(this.userEmail);
//     console.log(this.formData.value, "user log");
    
//     this.servive.getLogin(this.formData.value).subscribe((res) => {
//       this.response = res;

//       if (this.response.statusCode == 200) {
//         this.router.navigate(['/Dashboard']);
//         alert(this.response.message);
//         //window.location.href='/Dashboard'
//         this.servive.loader = false;
//         // console.log(this.UserList, "jwt")
//         this.UserList = this.response.result.jwtToken;
//         //console.log(this.response.result.jwtToken,'response')
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

/////////////////


// ile ya kitamb0

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare function showSuccessToast(msg: string): void;
declare function showDangerToast(msg: string, title?: string): void;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formData!: FormGroup;
  showPassword: boolean = false;
  changetype: boolean = true;
  visible: boolean = true;
  errorMessage: string = '';

  constructor(
    private service: SharedService,
   
    private fb: FormBuilder,
    private router: Router
  ) {
    this.service.isAuthenticated = false;
  }

  ngOnInit() {
    this.formData = this.fb.group({
      Email: ['', [Validators.required, Validators.email]], // Added email validator for better validation
      Password: ['', Validators.required]
    });
  }

  showpassword() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  // login() {
  //   console.log('Form Status:', this.formData.status); // Debugging form status
  //   console.log('Form Errors:', this.formData.errors); // Debugging form errors

  //   if (this.formData.valid) {
  //     this.service.loader = true;

  //     const credentials = {
  //       email: this.formData.value.Email,
  //       password: this.formData.value.Password
  //     };

  //     this.service.getLogin(credentials).subscribe(
  //       (response: any) => {
  //         this.service.loader = false; // Move this line before checking the response to ensure it's reset

  //         if (response && response.statusCode === 200) {
  //           const result = response.result;
  //           showSuccessToast('Login Successful');

            
  //           localStorage.setItem('currentUser', JSON.stringify(res.result.jwtToken));
  //            this.service.isAuthenticated = true;



  //           // Check if the user is authenticated
  //           if (this.service.isAuthenticated) {
  //             this.router.navigate(['/Dashboard']);
  //           } else {
  //             showDangerToast('Authentication failed');
  //           }
  //         } else {
  //           showDangerToast(response.message);
  //         }
  //       },
  //       (error) => {
  //         this.service.loader = false; // Ensure loader is reset even on error
  //         showDangerToast('Error: Unable to Login');
  //       }
  //     );
  //   } else {
  //     this.formData.markAllAsTouched(); // Mark all fields as touched to trigger validation messages
  //     showDangerToast('Please fill in all fields');
  //   }
  // }
    // login() {
    //   if (this.formData.valid) {
    //     console.log('Logging in with:', this.formData.value);

    //     this.service.loader = true;
    //     this.service.getLogin(this.formData.value)
    //       .subscribe((res) => {
    //         console.log('Login response:', res);
    //         this.service.loader = false;

    //         if (res.statusCode == 200) {
    //           this.router.navigate(['/Dashboard']);
    //           showSuccessToast(res.message);
    //           localStorage.setItem('currentUser', res.result.token);
    //           // localStorage.setItem('currentUser', JSON.stringify(res.result.jwtToken));
    //           this.service.isAuthenticated = true;
    //         } else {
    //           showDangerToast(res.message);
    //         }
    //       });
    //   } else {
    //     this.formData.markAllAsTouched(); // Mark all fields as touched to trigger validation messages
    //     showDangerToast('Please fill in all fields');
    //   }
    // }
  login() {
    if (this.formData.valid) {
      this.service.loader = true;
      this.service.getLogin(this.formData.value)
        .subscribe((res: any) => {
          this.service.loader = false;
          if (res.statusCode == 200) {
            // Store token and role in local storage
            localStorage.setItem('currentUser', JSON.stringify({ token: res.result.token, role: res.result.roles }));
            // Set authentication status
            this.service.isAuthenticated = true;
            // Redirect to dashboard
            this.router.navigate(['/Dashboard']);
            // Show success message
            showSuccessToast(res.message);
          } else {
            // Show error message
            showDangerToast(res.message);
          }
        }, (error) => {
          this.service.loader = false;
          // Show error message
          showDangerToast('Error: Unable to Login');
        });
    } else {
      this.formData.markAllAsTouched();
      // Show error message
      showDangerToast('Please fill in all fields');
    }
  }

  logout() {
    // Add logic to clear authentication status and token
    this.service.isAuthenticated = false;
    localStorage.removeItem('currentUser');
    // Redirect to login page after logout
    this.router.navigate(['/Authenticate']);
    // Reset form data after logout
    this.formData.reset();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
