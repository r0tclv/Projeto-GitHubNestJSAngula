import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';
  error = signal('');
  loading = signal(false);

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.error.set('');
    if (!this.email || !this.password) {
      this.error.set('Preencha todos os campos.');
      return;
    }

    this.loading.set(true);

    this.http
      .post<{ access_token: string }>('http://localhost:3000/auth/login', {
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.access_token);
          this.router.navigate(['/products']);
        },
        error: () => {
          this.loading.set(false);
          this.error.set('Email ou senha inválidos.');
        },
      });
  }
}