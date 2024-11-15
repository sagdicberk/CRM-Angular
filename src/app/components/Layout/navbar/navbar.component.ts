import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  navItems = [
    { icon: 'fa fa-users', label: 'Müşteriler', link: '/home/customers' },
    { icon: 'fa fa-users', label: 'Çalışanlar', link: '/home/employees' },
    { icon: 'fa fa-building', label: 'Şirketler', link: '/home/companies' },
    { icon: 'fa fa-eye', label: 'Fırsatlar', link: '/home/opportunities' },
    { icon: 'fa fa-list', label: 'Görevler', link: '/home/tasks' },
  ];

  constructor() {}
  ngOnInit(): void {}
}
