import { Component } from '@angular/core';
import { CompanyService } from '../../../../services/company/company.service';
import { company } from '../../../../dto/company/company.dto';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-company',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css'],
})
export class CreateCompanyComponent {
  // Yeni şirket için başlangıçta boş bir nesne oluşturuluyor
  newCompany: company = {
    id: 0,
    name: '',
    address: '',
    phone: '',
    email: '',
    industry: '',
  };

  constructor(private companyService: CompanyService, private router:Router) {}

  // Yeni şirketi oluşturma fonksiyonu
  createCompany() {
    if (this.isFormValid(this.newCompany)) {
      // Şirket oluşturuluyor ve servis çağrılıyor
      this.companyService.createCompany(this.newCompany).subscribe(
        (response) => {
          // Başarılı yanıt alındığında yapılacak işlemler
          console.log('Şirket başarıyla oluşturuldu:', response);
          this.router.navigate(['/home/companies']);
          // Kullanıcıyı bilgilendirme (örneğin bir mesaj göstermek)
        },
        (error) => {
          // Hata durumunda yapılacak işlemler
          console.error('Hata oluştu:', error);
        }
      );
    } else {
      // Hatalı formu kullanıcıya bildir
      alert('Lütfen tüm alanları doğru şekilde doldurun.');
    }
  }

  // Form verilerinin doğruluğunu kontrol eden fonksiyon
  private isFormValid(company: company): boolean {
    return (
      company.name !== '' &&
      company.address !== '' &&
      company.phone !== '' &&
      company.email !== '' &&
      company.industry !== ''
    );
  }
}
