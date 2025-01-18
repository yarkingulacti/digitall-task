import { Component } from '@angular/core';
import { CrewListComponent } from '../components/crew-list/crew-list.component';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [CrewListComponent, RouterOutlet],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
