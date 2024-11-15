import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../../services/customer/customer.service';
import { Router } from '@angular/router';
import { customer } from '../../../../dto/customer/customer';
import { CompanyService } from '../../../../services/company/company.service';
import { company } from '../../../../dto/company/company.dto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-customer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.css',
})
export class CreateCustomerComponent implements OnInit {
  customer: customer = {
    id: 0,
    name: '',
    address: '',
    phone: '',
    email: '',
    companyId: 0,
  };

  companies: company[] = [];
  errorMessage: string | undefined;
  successMessage: string | undefined;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  // Şirketleri yükleyen metod
  loadCompanies(): void {
    this.companyService.findAllCompanies().subscribe({
      next: (data) => {
        this.companies = data;
      },
      error: (err) => {
        console.error('Şirketler yüklenirken bir hata oluştu:', err);
        this.errorMessage = 'Şirketler yüklenirken bir hata oluştu!';
      },
    });
  }

  // Müşteri oluşturma fonksiyonu
  createCustomer(): void {
    if (this.validateForm()) {
      // Ensure the customer object contains the full company object

      this.customerService.createCustomer(this.customer).subscribe({
        next: (response) => {
          this.successMessage = 'Müşteri başarıyla oluşturuldu!';
          console.log(response);

          setTimeout(() => {
            this.router.navigate(['/home/customers']);
          }, 2000);
        },
        error: (err) => {
          console.error('Müşteri oluşturulurken bir hata oluştu:', err);
          this.errorMessage = 'Müşteri oluşturulurken bir hata oluştu!';
        },
      });
    }
  }

  // Form doğrulama fonksiyonu
  validateForm(): boolean {
    if (
      !this.customer.name ||
      !this.customer.address ||
      !this.customer.phone ||
      !this.customer.email ||
      !this.customer.companyId
    ) {
      this.errorMessage = 'Lütfen tüm alanları doldurun!';
      return false;
    }
    return true;
  }
}
