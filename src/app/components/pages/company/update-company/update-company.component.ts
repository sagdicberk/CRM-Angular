import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../../services/company/company.service';
import { company } from '../../../../dto/company/company.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-company',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css'], // Düzeltildi
})
export class UpdateCompanyComponent implements OnInit {
  existingCompany: company | undefined;
  id: string | null = null;
  CompanyId: number | undefined;

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router // Küçük harf düzeltildi
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.CompanyId = Number(this.id) || 0; // Tip dönüşümü düzeltildi

    if (this.CompanyId) {
      this.findCompanyById(this.CompanyId);
    } else {
      this.router.navigate(['/home/companies']);
    }
  }

  findCompanyById(id: number): void {
    this.companyService.findCompanyById(id).subscribe({
      next: (data) => (this.existingCompany = data),
      error: (err) => console.error(err),
      complete: () => console.log('Şirket bulundu'),
    });
  }

  updateCompany(id: number, existingCompany: company): void {
    this.companyService.updateCompany(id, existingCompany).subscribe({
      next: () => this.router.navigate(['/home/companies']),
      error: (err) => console.error(err),
      complete: () => console.log('Güncelleme tamamlandı'),
    });
  }
}
