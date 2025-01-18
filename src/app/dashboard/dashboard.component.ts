import { Component } from '@angular/core';
import { CrewListComponent } from '../components/crew-list/crew-list.component';

@Component({
  imports: [CrewListComponent],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
