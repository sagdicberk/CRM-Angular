import { Routes } from '@angular/router';
import { LoginComponent } from './components/Auth/login/login.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import { HomeComponent } from './components/Layout/home/home.component';
import { authGuard } from './config/auth.guard';
import { CompanyComponent } from './components/pages/company/company.component';
import { CreateCompanyComponent } from './components/pages/company/create-company/create-company.component';
import { UpdateCompanyComponent } from './components/pages/company/update-company/update-company.component';
import { DeleteCompanyComponent } from './components/pages/company/delete-company/delete-company.component';
import { CustomerComponent } from './components/pages/customer/customer.component';
import { CreateCustomerComponent } from './components/pages/customer/create-customer/create-customer.component';
import { UpdateCustomerComponent } from './components/pages/customer/update-customer/update-customer.component';
import { DeleteCustomerComponent } from './components/pages/customer/delete-customer/delete-customer.component';

export const routes: Routes = [
  // Redirect to login if no path matches
  { path: '', pathMatch: 'full', redirectTo: '/login' },

  // Authentication routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Home route with authentication guards
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard], // Protect the home route
    canActivateChild: [authGuard], // Protect child routes of home
    children: [
      {
        path: 'companies', // List of companies page
        component: CompanyComponent,
      },
      {
        path: 'companies/create', // Create company page
        component: CreateCompanyComponent,
      },
      {
        path: 'companies/update/:id', // update company page
        component: UpdateCompanyComponent,
      },
      {
        path: 'companies/delete/:id', // delete company page
        component: DeleteCompanyComponent,
      },
      {
        path: 'customers',
        component: CustomerComponent,
      },
      {
        path: 'customers/create',
        component: CreateCustomerComponent,
      },
      {
        path: 'customers/update/:id', // update company page
        component: UpdateCustomerComponent,
      },
      {
        path: 'customer/delete/:id',
        component: DeleteCustomerComponent
      },
    ],
  },
];
