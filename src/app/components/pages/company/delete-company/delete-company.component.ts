import { Component, OnInit } from '@angular/core';
import { company } from '../../../../dto/company/company.dto';
import { CompanyService } from '../../../../services/company/company.service';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-company',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './delete-company.component.html',
  styleUrl: './delete-company.component.css',
})
export class DeleteCompanyComponent implements OnInit {
  company: company | undefined;
  routerId: string | null = null;
  CompanyId: number | undefined;

  constructor(
    private companyService: CompanyService,
    private router: ActivatedRoute,
    private navigator: Router
  ) {}

  ngOnInit(): void {
    this.routerId = this.router.snapshot.paramMap.get('id');
    this.CompanyId = Number(this.routerId);

    if (this.CompanyId) {
      this.findCompanyById(this.CompanyId);
    }
  }

  findCompanyById(id: number) {
    this.companyService.findCompanyById(id).subscribe({
      next: (data) => (this.company = data),
      error: (err) => console.error(err),
      complete: () => console.log('Şirket bulundu'),
    });
  }

  deleteCompanyById(id: number) {
    this.companyService.deleteCompany(id).subscribe({
      next: (data) => {
        this.navigator.navigate(['/home/companies']);
        console.log(data);
      },
      error: (err) => console.error(err),
      complete: () => console.log('silme işlemi tamamlandı'),
    });
  }

  cancel(){
    this.navigator.navigate(['/home/companies']);
  }
}
