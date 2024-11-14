import { Component, NgModule, OnInit } from '@angular/core';
import { CompanyService } from '../../../services/company/company.service';
import { company } from '../../../dto/company/company.dto';
import { CommonModule } from '@angular/common';
import { timeout } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css',
})
export class CompanyComponent implements OnInit {
  companies: company[] | undefined;
  searchTerm: string = '';
  errorMessage: string | undefined;

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.findAllCompanies();
  }

  // Tüm şirketleri listele
  findAllCompanies() {
    this.companyService
      .findAllCompanies()
      .pipe(timeout(10000))
      .subscribe(
        (data) => {
          if (data) {
            this.companies = data;
            this.errorMessage = undefined; // Başarılı olduğunda hata mesajını sıfırla
          }
        },
        (error) => {
          this.companies = [];
          this.errorMessage = 'Şirketlere ulaşılamadı. Lütfen tekrar deneyin.'; // Hata mesajı
          console.error('Şirketlere ulaşılamadı', error);
        }
      );
  }

  // Arama fonksiyonu
  searchName() {
    if (this.searchTerm.trim()) {
      // Eğer arama terimi varsa, boşluklar hariç
      this.companyService
        .findCompanyByName(this.searchTerm.trim())
        .pipe(timeout(10000))
        .subscribe(
          (data) => {
            if (data.length > 0) {
              this.companies = data; // Arama sonuçlarını al
              this.errorMessage = undefined;
            } else {
              this.companies = [];
              this.errorMessage = 'Aradığınız şirket bulunamadı.';
            }
          },
          (error) => {
            this.companies = [];
            this.errorMessage =
              'Arama işlemi gerçekleşmedi. Lütfen tekrar deneyin.'; // Hata mesajı
            console.error('Arama işlemi gerçekleşmedi', error);
          }
        );
    } else {
      // Arama terimi boş ise, tüm şirketleri listele
      this.findAllCompanies();
    }
  }
}
