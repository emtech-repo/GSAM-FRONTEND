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
  message: string = '';
  isSuccess: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: SharedService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.formBuilder.group({
      PfNumber: ['', Validators.required],
      FullName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      Gender: ['male']
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.service.registerUser(this.registerForm.value).subscribe(
        (response: any) => {
          if (response && response.statusCode === 201) {
            this.showMessage('Success', response.message, true);

            this.registerForm.reset(); // Clear the form
            // this.router.navigate(['/register']);// refresh
          } else {
            this.showMessage('Error', response.message || 'An error occurred', false);
          }
        },
        (error) => {
          console.error(error);
          this.showMessage('Error', 'Check connection', false);
        }
      );
    } else {
      this.showMessage('Error', 'Please enter valid data.', false);
    }
  }

  showMessage(title: string, message: string, isSuccess: boolean) {
    this.message = message;
    this.isSuccess = isSuccess;
    setTimeout(() => {
      this.message = ''; // Clear the message after a certain duration
    }, 3000);
  }
}
