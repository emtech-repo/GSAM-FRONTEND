import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SharedService } from '../shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: SharedService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
<<<<<<< HEAD
      gender: ['male'],
      role: [''],
=======
       gender: ['male'],
     creationDate: [new Date()], // Initialize with current date
      role: [''],

>>>>>>> 72f93a49a8b38c5532c8ccb89630cc7fda3b2ec6
      isactive: [false]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.service.registerUser(this.registerForm.value).subscribe(
        () => {
          this.openSnackBar('Success', 'Registered successfully', true);
          this.router.navigate(['Authenticate']);
        },
        () => {
          this.openSnackBar('Error', 'Check connection', false);
        }
      );
    } else {
      this.openSnackBar('Error', 'Please enter valid data.', false);
    }
  }

  openSnackBar(title: string, message: string, isSuccess: boolean) {
    const panelClass = isSuccess ? 'success-snackbar' : 'danger-snackbar';
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: [panelClass]
    });
  }
}
