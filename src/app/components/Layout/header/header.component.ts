import { Component } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  username: string = '';
  isDropdownOpen = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (data) => {
        if (data) {
          this.username = data.username;
        }
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }

  onQuit(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  // -----------------------
  showDropdown() {
    this.isDropdownOpen = true;
  }

  hideDropdown() {
    this.isDropdownOpen = false;
  }
}
