import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment} from '../../environments/environment';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message-send',
  imports: [FormsModule, CommonModule],
  templateUrl: './message-send.html',
  styleUrl: './message-send.css',
})
export class MessageSend {
  message = {
    phone_number: '',
    message_content: '',
    status: '',
  };

  messageHistory: any[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;
  token = localStorage.getItem('authToken') || '';
  headers =  {
    headers: {
      Authorization: `Bearer ${this.token}`,
    },
  };
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit() {
    this.fetchMessageHistory();
  }

  sendMessage() {  
    const messageData = { 'message': this.message };
    const url = `${environment.baseUrl}/messenger`;
    this.http.post(url, messageData, this.headers).subscribe({
      next: (response: any) => {
        this.successMessage = 'Message sent successfully!';
        this.errorMessage = null;
       
        this.fetchMessageHistory();
        setTimeout(() => {
          this.fetchMessageHistory();
        }, 5000); 
      },
      error: (error) => {
        this.errorMessage = 'Failed to send message.';
        this.successMessage = null;
        console.error('Error sending message:', error);
        this.cdr.detectChanges();
      },
    });
  }

  fetchMessageHistory() {
    const url = `${environment.baseUrl}/messenger`;
    this.http.get<[]>(url, this.headers).subscribe({
      next: (response: any) => {
        this.messageHistory = response;

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching message history:', error);
      },
    });
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  clearAll() {
    this.message.phone_number = '';
    this.message.message_content = '';
  }

  updateCharacterCount() {
    if (this.message.message_content.length > 250) {
      this.message.message_content = this.message.message_content.slice(0, 250); // Trim excess characters
    }
  }
}
