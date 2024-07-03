import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-forgot-page',
  templateUrl: './forgot-page.component.html',
  styleUrls: ['./forgot-page.component.css']
})
export class ForgotPageComponent implements OnInit {
  resetForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  email: string = '';
  token: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.token = params['token'];
    });

    this.resetForm = this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[0-9]).*$/)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatch });
  }

  ngOnInit(): void {

  }

  passwordsMatch(group: FormGroup): { [key: string]: boolean } | null {
    const passwordControl = group.get('Password');
    const confirmPasswordControl = group.get('confirmPassword');

    if (passwordControl && confirmPasswordControl) {
      if (passwordControl.value === confirmPasswordControl.value) {
        return null; // Passwords match
      } else {
        return { passwordsMatch: true }; // Passwords don't match
      }
    }
    return null;
  }

  resetPassword(): void {
    if (this.resetForm.valid) {
      this.loading = true;
      const { Password, confirmPassword } = this.resetForm.value;

      if (Password !== confirmPassword) {
        this.errorMessage = 'Passwords do not match.';
        this.successMessage = '';
        this.loading = false;
        return; // Exit function if passwords don't match
      }

      const payload = { email: this.email, token: this.token, Password, confirmPassword };
      console.log('good',payload)

      this.sharedService.forgotPassword(payload).subscribe(
        (response: any) => {
          this.successMessage = response.message;
          this.errorMessage = '';
          this.loading = false;
          setTimeout(() => this.router.navigate(['/Authenticate']), 5000);
        },
        (error) => {
          this.errorMessage = error.message;
          this.successMessage = '';
          this.loading = false;
        }
      );
    }
  }
}
