import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../../dto/auth/register-request';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  passwordCheck: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    // Form gönderildiğinde yapılacak işlemler
    if (this.password !== this.passwordCheck) {
      this.errorMessage = 'Şifreler uyuşmuyor!';
      return;
    }

    if (
      !this.username ||
      !this.email ||
      !this.password ||
      !this.passwordCheck
    ) {
      this.errorMessage = 'Lütfen tüm alanları doldurun!';
      return;
    }

    const registerRequest: RegisterRequest = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    this.authService.register(registerRequest).subscribe({
      next: (response) => {
        console.log('register başarılı', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('register başarısız', error);
        this.errorMessage = 'register başarısız. Lütfen tekrar deneyiniz';
      },
    });
  }
}
