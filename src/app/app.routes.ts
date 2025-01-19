import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrewDetailComponent } from './crew/detail/detail.component';
import { CrewCertificateCreateComponent } from './crew-certificate/create/create.component';
import { CrewEditComponent } from './crew/edit/edit.component';
import { CrewCertificateListComponent } from './crew-certificate/list/list.component';
import { CrewCreateComponent } from './crew/create/create.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CrewCertificateEditComponent } from './certificate/edit/edit.component';
import { CertificateTypeCreateComponent } from './certificate-type/create/create.component';
import { CertificateTypeEditComponent } from './certificate-type/edit/edit.component';
import { CertificateTypeListComponent } from './certificate-type/list/list.component';

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
    ],
  },
  { path: 'crew/:slug/detail', component: CrewDetailComponent },
  {
    path: 'certificate',
    children: [
      {
        path: 'create',
        component: CrewCertificateCreateComponent,
        outlet: 'modal',
      },
      {
        path: 'list',
        component: CrewCertificateListComponent,
      },
      {
        path: ':id/edit',
        component: CrewCertificateEditComponent,
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
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
