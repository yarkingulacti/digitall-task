import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { Crew } from '../../../../data/crew';
import { CrewService } from '../../../services/crew.service';

@Component({
  imports: [CommonModule, MatDividerModule, MatTabsModule],
  selector: 'pages-crew-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class CrewDetailComponent implements OnInit {
  crew: Crew | undefined;

  constructor(
    private crewService: CrewService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.crew = this.crewService.getCrew(slug);
    }
  }

  isExpired(date: Date): boolean {
    return new Date(date) < new Date();
  }
}
