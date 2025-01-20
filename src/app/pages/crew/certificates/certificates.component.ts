import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Certificate, Crew } from '../../../../data/crew';
import { CrewService } from '../../../services/crew.service';

@Component({
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  selector: 'pages-crew-certificates',
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.scss',
})
export class CrewCertificatesComponent implements OnInit {
  crewMember: Crew | null = null;
  dataSource = new MatTableDataSource<Certificate>([]);
  displayedColumns: string[] = [
    'title',
    'type',
    'issue_date',
    'expiration_date',
  ];

  constructor(
    private crewService: CrewService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug') || '';
    const crewMember = this.crewService.getCrewMemberBySlug(slug);

    if (crewMember) {
      this.crewMember = crewMember;
      this.dataSource.data = crewMember.certificates;
    }
  }

  closeModal() {
    this.router.navigate(['/', { outlets: { modal: null } }]);
  }
}
