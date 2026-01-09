import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment} from '../../environments/environment';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})

export class SignUp {
  email = '';
  password = '';
  passwordConfirmation = '';
  errorMessage = '';

  // Password requirement flags
  passwordLengthValid = false;
  passwordHasNumber = false;
  passwordHasUppercase = false;
  passwordHasLowercase = false;
  passwordHasSpecialChar = false;

  constructor(private http: HttpClient,  private cdr: ChangeDetectorRef, private router: Router) {}

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
        this.router.navigate(['/login'], {
          state: { message: 'Sign up successful! Please log in.' },
        });
      },
      error: (error) => {
        console.error('Sign up failed:', error);
        this.errorMessage = error.error.status.message || 'Sign up failed. Please try again.';
        this.cdr.detectChanges();
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

  isPasswordValid(): boolean {
    return (
      this.passwordLengthValid &&
      this.passwordHasNumber &&
      this.passwordHasUppercase &&
      this.passwordHasLowercase &&
      this.passwordHasSpecialChar
    );
  }
}
