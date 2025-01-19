import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { CrewMember } from '../../../crew';
import { CrewServiceService } from '../../crew-service.service';

@Component({
  imports: [CommonModule, MatDividerModule, MatTabsModule],
  selector: 'app-crew-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class CrewDetailComponent implements OnInit {
  crewMember: CrewMember | undefined;

  constructor(
    private crewService: CrewServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.crewMember = this.crewService.getCrew(slug);
    }
  }

  isExpired(date: Date): boolean {
    return new Date(date) < new Date();
  }
}
