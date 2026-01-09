import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  email = '';
  password = '';
  errorMessage: string | null = null;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, private router: Router) {}

  login() {
    const url = `${environment.baseUrl}/users/sign_in`;
    const userData = {
      user: {
        email: this.email,
        password: this.password,
      },
    };


    this.http.post(url, userData, { observe: 'response' }).subscribe({
      next: (response) => {
        this.errorMessage = null;
        if (response.status === 200) {
          console.log('Login successful:', response);
    
          // Extract the token from the Authorization header
          const token = response.headers.get('Authorization')?.split(' ')[1] || null;
          if (token) {
            localStorage.setItem('authToken', token);
            console.log('Token stored in localStorage:', token);
          } else {
            console.warn('No token found in the Authorization header.');
          }
    
          // Redirect to the home page
          this.router.navigate(['/send-message']);
        } else {
          this.errorMessage = 'Unexpected response from the server.';
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        if (error.status === 401) {
          this.errorMessage = 'Invalid email or password.';
        } else {
          this.errorMessage = 'An unexpected error occurred.';
        }
        console.error('Login failed:', error);
        this.cdr.detectChanges();
      },
    });
  }
}