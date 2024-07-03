

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



  login() {
    if (this.formData.valid) {
      this.service.loader = true;
      this.service.getLogin(this.formData.value)
        .subscribe((res: any) => {
          this.service.loader = false;
          if (res.statusCode == 200) {
            // Store token and role in local storage
            localStorage.setItem('currentUser', JSON.stringify({ token: res.result.token, role: res.result.roles, email: res.result.email }));
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
          showDangerToast('Error: Unable to Login check Connection');
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
