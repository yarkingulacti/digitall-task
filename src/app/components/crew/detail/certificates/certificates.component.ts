import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Crew } from '../../../../../data/types';
import { CrewService } from '../../../../services/crew.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  imports: [CommonModule, TranslateModule],
  selector: 'components-crew-detail-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss'],
})
export class CrewDetailCertificatesComponent {
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

  public isExpired(date: Date): boolean {
    return new Date(date) < new Date();
  }
}
