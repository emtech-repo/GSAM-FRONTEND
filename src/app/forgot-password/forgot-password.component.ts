import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent  implements OnInit {

  form!: FormGroup;

  constructor(private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      email: ["", [Validators.required, Validators.email]], // Added 'required' validator
      newPassword: ["", [Validators.required, Validators.minLength(8)]], // New field for new password
      confirmNewPassword: ["", [Validators.required]] // New field for confirming new password
    }, { validator: this.checkPasswords }); // Added a custom validator to check if newPassword and confirmNewPassword match
  }

  login() {
    throw new Error('Method not implemented.');
  }

  get email() {
    return this.form.get('email');
  }

  // Custom validator to check if newPassword and confirmNewPassword match
  // Custom validator to check if newPassword and confirmNewPassword match
  checkPasswords(group: FormGroup) {
    let pass = group.get('newPassword')?.value ?? ''; // Use optional chaining and nullish coalescing
    let confirmPass = group.get('confirmNewPassword')?.value ?? ''; // Use optional chaining and nullish coalescing

    return pass === confirmPass ? null : { notSame: true };
  }
}
