import { Component } from '@angular/core';
import { CrewMember } from '../../crew-data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  crewMembers: CrewMember[] = [];

  constructor() {}
}
