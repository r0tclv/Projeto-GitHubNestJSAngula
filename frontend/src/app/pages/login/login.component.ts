import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(private http: HttpClient) {}

  login() {
    this.http.post('http://localhost:3000/login', {
      email: this.email,
      password: this.password
    }).subscribe((res: any) => {
      localStorage.setItem('token', res.access_token);
    });
  }

}