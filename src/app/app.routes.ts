import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CrewCreateComponent } from './pages/crew/create/create.component';
import { CrewEditComponent } from './pages/crew/edit/edit.component';
import { CrewCertificatesComponent } from './pages/crew/certificates/certificates.component';
import { CrewDetailComponent } from './pages/crew/detail/detail.component';
import { CertificateCreateComponent } from './pages/certificate/create/create.component';
import { CertificateListComponent } from './pages/certificate/list/list.component';
import { CertificateEditComponent } from './pages/certificate/edit/edit.component';
import { CertificateTypeCreateComponent } from './pages/certificate/type/create/create.component';
import { CertificateTypeListComponent } from './pages/certificate/type/list/list.component';
import { CertificateTypeEditComponent } from './pages/certificate/type/edit/edit.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'crew/create', component: CrewCreateComponent, outlet: 'modal' },
      {
        path: 'crew/:slug/edit',
        component: CrewEditComponent,
        outlet: 'modal',
      },
      {
        path: 'crew/:slug/certificates',
        component: CrewCertificatesComponent,
        outlet: 'modal',
      },
    ],
  },
  { path: 'crew/:slug/detail', component: CrewDetailComponent },
  {
    path: 'certificate',
    children: [
      {
        path: 'create',
        component: CertificateCreateComponent,
        outlet: 'modal',
      },
      {
        path: 'list',
        component: CertificateListComponent,
      },
      {
        path: ':id/edit',
        component: CertificateEditComponent,
        outlet: 'modal',
      },
    ],
  },
  {
    path: 'certificate-type',
    children: [
      {
        path: 'create',
        component: CertificateTypeCreateComponent,
        outlet: 'modal',
      },
      {
        path: 'list',
        component: CertificateTypeListComponent,
      },
      {
        path: ':id/edit',
        component: CertificateTypeEditComponent,
        outlet: 'modal',
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
