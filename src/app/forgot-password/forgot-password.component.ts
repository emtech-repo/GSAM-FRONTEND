import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';



@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  formData: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  showAlert: boolean = false;
  submitting: boolean = false;
  loading: boolean = false; // Add loading indicator

  constructor(private service: SharedService, private fb: FormBuilder, private router: Router) {
    this.formData = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.service.isAuthenticated = false;
  }

  onSubmit() {
    if (this.formData.valid && !this.submitting) {
      this.submitting = true;
      this.loading = true; // Set loading to true when submitting

      const email = this.formData.value.Email;
      const clientUri = 'http://localhost:4200/ForgotPage'; // Replace with your client URI for reset password

      this.service.sendResetEmail({ email, ClientUri: clientUri }).subscribe(
        (response: any) => {
          console.log('Reset email sent successfully!', response);
          this.showAlert = true; 
          this.successMessage = response.message;
          this.errorMessage = ''; // Clear any previous error message
        },
        error => {
          console.error('Error sending reset email:', error);
          this.errorMessage = 'Failed to send reset email. Please try again.'; // Set error message
          this.successMessage = ''; // Clear any previous success message
        }
      ).add(() => {
        this.loading = false; // Set loading to false after API call completes
        this.submitting = false; // Reset submitting state
      });
    } else {
      console.log('Form is invalid');
    }
  }
}