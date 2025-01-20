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
import { Certificate, Crew, Title } from '../../../../data/crew';
import { CrewService } from '../../../services/crew.service';
import { CertificateService } from '../../../services/certificate.service';

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

  onSubmit() {
    if (this.formGroup.valid && this.crewMember) {
      const formValue = this.formGroup.value;
      const updatedCrew: Crew = {
        ...this.crewMember,
        ...formValue,
        certificates: formValue.certificate,
        slug: slugify(`${formValue.first_name} ${formValue.last_name}`, {
          lower: true,
        }),
        total_income: formValue.days_on_board * formValue.daily_rate,
      };
      this.crewService.editCrew(this.crewMember.slug, updatedCrew);
      this.closeModal();
    }
  }

  onCancel() {
    this.closeModal();
  }

  public closeModal() {
    this.router.navigate([{ outlets: { modal: null } }]);
  }
}
