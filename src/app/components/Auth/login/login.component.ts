import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../../dto/auth/login-request';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent  {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
   }



  onSubmit() {
    // Form gönderildiğinde yapılacak işlemler
    const loginRequest: LoginRequest = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(loginRequest).subscribe({
      next: (response) => {
        console.log('login başarılı', response);
        sessionStorage.setItem('token', response);

        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('login başarısız', error);
        this.errorMessage = 'Giriş başarısız. Lütfen tekrar deneyiniz';
      },
    });
  }
}
