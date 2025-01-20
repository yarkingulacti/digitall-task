import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CrewListComponent } from '../../components/crew/list/crew-list.component';

@Component({
  imports: [CrewListComponent, RouterOutlet],
  selector: 'pages-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
