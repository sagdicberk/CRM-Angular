import { Component, OnInit } from '@angular/core';
import { customer } from '../../../dto/customer/customer';
import { CustomerService } from '../../../services/customer/customer.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { customerResponse } from '../../../dto/customer/customer.response';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  customers: customerResponse[] | null = null;
  searchTerm: string = '';
  errorMessage: string | undefined;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.findAllCustomers(); // Başlangıçta tüm müşterileri al
  }

  // Tüm müşterileri listele
  findAllCustomers(): void {
    this.customerService.findAllCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        this.errorMessage = undefined; // Başarılı olduğunda hata mesajını sıfırla
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Müşteri verileri alınırken bir hata oluştu.'; // Hata mesajı göster
      },
      complete: () => console.log('Müşteriler başarıyla çağrıldı'),
    });
  }

  // Arama yapılacak fonksiyon
  findCustomerBySearchTerm(): void {
    if (this.searchTerm.trim() === '') {
      this.errorMessage = 'Lütfen geçerli bir arama terimi girin.';
      setTimeout(() => {
        this.findAllCustomers();
      }, 2000);

      return;
    }

    this.customerService.findCustomerByEmail(this.searchTerm.trim()).subscribe({
      next: (data) => {
        this.customers = data;

        this.errorMessage = undefined;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Arama yapılırken bir hata oluştu.'; // Hata mesajı göster
      },
      complete: () => console.log('Arama tamamlandı'),
    });
  }
}