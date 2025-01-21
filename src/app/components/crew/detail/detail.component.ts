import { Component, OnInit } from '@angular/core';
import { Crew } from '../../../../data/types';
import { CrewService } from '../../../services/crew.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  imports: [CommonModule, TranslateModule],
  selector: 'components-crew-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class CrewDetailComponent implements OnInit {
  public crew: Crew | undefined;

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
}
