import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmNewPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    let newPassword = formGroup.controls['newPassword'].value;
    let confirmPassword = formGroup.controls['confirmNewPassword'].value;
    return newPassword === confirmPassword ? null : { notSame: true };
  }

  ngOnInit(): void {
    // Initialization logic goes here
  }

  onSubmit() {
    if (this.form.valid) {
      // Call your service to handle password reset
      console.log('Form submitted!', this.form.value);
    } else {
      // Form is invalid
      console.log('Form is invalid');
    }
  }
}