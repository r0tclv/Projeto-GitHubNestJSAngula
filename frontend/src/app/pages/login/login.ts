import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html'
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login() {

    this.http.post('http://localhost:3000/login', {
      email: this.email,
      password: this.password
    })
    .subscribe((res: any) => {

      localStorage.setItem('token', res.access_token);

      this.router.navigate(['/products']);

    });
  }

}