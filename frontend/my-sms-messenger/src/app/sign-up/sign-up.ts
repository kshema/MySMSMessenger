import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment} from '../../environments/environment';

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})

export class SignUp {
  email = '';
  password = '';
  passwordConfirmation = '';

  // Password requirement flags
  passwordLengthValid = false;
  passwordHasNumber = false;
  passwordHasUppercase = false;
  passwordHasLowercase = false;
  passwordHasSpecialChar = false;

  constructor(private http: HttpClient, private router: Router) {}

  signUp() {
    const url = `${environment.baseUrl}/users`;
    const userData = {
      user: {
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      },
    };

    this.http.post(url, userData).subscribe({
      next: (response) => {
        console.log('Sign up successful:', response);
        this.router.navigate(['/login']); // Redirect to login page after successful sign up
      },
      error: (error) => {
        console.error('Sign up failed:', error);
      },
    });
  }

  checkPasswordRequirements() {
    const password = this.password;

    this.passwordLengthValid = password.length >= 6;
    this.passwordHasNumber = /\d/.test(password);
    this.passwordHasUppercase = /[A-Z]/.test(password);
    this.passwordHasLowercase = /[a-z]/.test(password);
    this.passwordHasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  }
}
