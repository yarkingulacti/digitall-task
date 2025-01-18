import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrewDetailComponent } from './crew/detail/detail.component';
import { CrewCertificateDetailComponent } from './crew-certificate/detail/detail.component';
import { CrewCertificateComponent } from './crew-certificate/create/create.component';
import { CrewEditComponent } from './crew/edit/edit.component';
import { CrewCertificateListComponent } from './crew-certificate/list/list.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'crew/create', component: CrewDetailComponent },
  { path: 'crew/:slug/detail', component: CrewDetailComponent },
  { path: 'crew/:slug/edit', component: CrewEditComponent },
  { path: 'certificate/list', component: CrewCertificateListComponent },
  { path: 'certificate/create', component: CrewCertificateComponent },
  { path: 'certificate/:id/detail', component: CrewCertificateDetailComponent },
  { path: 'certificate/:id/edit', component: CrewCertificateComponent },
];
