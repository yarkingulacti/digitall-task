import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import slugify from 'slugify';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import titles from '../../../../data/titles.data';
import { Certificate, Crew, Title } from '../../../../data/types';
import { CrewService } from '../../../services/crew.service';
import { CertificateService } from '../../../services/certificate.service';
import { nationalities } from '../../../../data/nationalities.data';

@Component({
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatDialogModule,
    TranslateModule,
  ],
  selector: 'pages-crew-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class CrewEditComponent implements OnInit {
  formGroup: FormGroup;
  crewMember: Crew | undefined;
  titles: Title[] = titles;
  nationalities = nationalities;
  crewCertificates: Certificate[] = [];
  currencies = ['USD', 'EUR', 'GBP'];

  constructor(
    private fb: FormBuilder,
    private crewService: CrewService,
    private crewCertificateService: CertificateService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formGroup = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      nationality: ['', Validators.required],
      title: ['', Validators.required],
      certificate: [[], Validators.required],
      days_on_board: [0, [Validators.required, Validators.min(0)]],
      daily_rate: [0, [Validators.required, Validators.min(0)]],
      currency: ['USD', Validators.required],
    });
  }

  ngOnInit() {
    this.crewCertificates = this.crewCertificateService.certificates;
    const slug = this.route.snapshot.paramMap.get('slug');

    if (slug) {
      this.crewMember = this.crewService.getCrew(slug);

      if (this.crewMember) {
        this.formGroup.patchValue({
          ...this.crewMember,
          certificate: this.crewMember.certificates,
        });
      }
    }
  }

  async onSubmit() {
    if (this.formGroup.valid && this.crewMember) {
      const updatedCrew: Crew = {
        ...this.crewMember,
        ...this.formGroup.value,
        certificates: this.formGroup.value.certificate,
        slug: slugify(
          `${this.formGroup.value.first_name} ${this.formGroup.value.last_name}`,
          {
            lower: true,
          }
        ),
        total_income:
          this.formGroup.value.days_on_board * this.formGroup.value.daily_rate,
      };

      await this.crewService.editCrew(this.crewMember.slug, updatedCrew);
      this.closeModal();
    }
  }

  public closeModal() {
    this.router.navigate([{ outlets: { modal: null } }]);
  }
}
