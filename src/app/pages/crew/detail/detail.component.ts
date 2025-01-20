import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { Crew } from '../../../../data/types';
import { CrewService } from '../../../services/crew.service';
import { ActivatedRoute } from '@angular/router';
import { CrewDetailComponent as DetailComponent } from '../../../components/crew/detail/detail.component';
import { CrewDetailCertificatesComponent } from '../../../components/crew/detail/certificates/certificates.component';

@Component({
  imports: [
    MatDividerModule,
    MatTabsModule,
    DetailComponent,
    CrewDetailCertificatesComponent,
  ],
  selector: 'pages-crew-detail',
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
