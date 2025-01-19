import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrewDetailComponent } from './crew/detail/detail.component';
import { CrewCertificateDetailComponent } from './crew-certificate/detail/detail.component';
import { CrewCertificateComponent } from './crew-certificate/create/create.component';
import { CrewEditComponent } from './crew/edit/edit.component';
import { CrewCertificateListComponent } from './crew-certificate/list/list.component';
import { CrewCreateComponent } from './crew/create/create.component';

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
    path: 'certificate/list',
    component: CrewCertificateListComponent,
    children: [
      { path: 'certificate/create', component: CrewCertificateComponent },
      { path: 'certificate/:id/edit', component: CrewCertificateComponent },
    ],
  },
  { path: 'certificate/:id/detail', component: CrewCertificateDetailComponent },
];
