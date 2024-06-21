import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  currentUser?: string;
  email: string;
  errorMessage: string = '';
  resetForm: FormGroup;
  successMessage: string = '';


  constructor(
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      this.email = currentUser.email; // Assuming the user object has an email property
    } else {
      // Handle the case when there is no current user in local storage
      this.email = '';
    }

    this.resetForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.resetForm.controls;
  }

  resetPassword() {
    // Check if form is valid
    if (this.resetForm.invalid) {
      return;
    }

    if (this.f['newPassword'].value !== this.f['confirmPassword'].value) {
      this.errorMessage = "Passwords do not match";
      return;
    }

    const resetPasswordPayload = {
      email: this.email,
      oldPassword: this.f['oldPassword'].value,
      newPassword: this.f['newPassword'].value
    };
    console.log(resetPasswordPayload);
    this.sharedService.resetPassword(resetPasswordPayload)
      .subscribe(
        (response:any) => {
          // Assuming the response is a string message
          this.successMessage = response.message;
          setTimeout(() => {
            this.router.navigate(['/login'], { queryParams: { reset: 'success' } });
          }, 3000); // Wait for 3 seconds before navigating away
        },
        (error) => {
          this.errorMessage = error.message;
        }
      );
}
}