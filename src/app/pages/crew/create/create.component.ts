import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
import { v4 as uuidv4 } from 'uuid';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Certificate, Crew, Title } from '../../../../data/types';
import titles from '../../../../data/titles.data';
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
  selector: 'pages-crew-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CrewCreateComponent implements OnInit {
  formGroup: FormGroup;
  titles: Title[] = titles;
  nationalities = nationalities;
  crewCertificates: Certificate[] = [];
  currencies = ['USD', 'EUR', 'GBP'];

  constructor(
    private fb: FormBuilder,
    private crewService: CrewService,
    private certificateService: CertificateService,
    private router: Router
  ) {
    this.formGroup = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      nationality: ['', Validators.required],
      title: ['', Validators.required],
      certificate: [null, Validators.required],
      days_on_board: [0, [Validators.required, Validators.min(0)]],
      daily_rate: [0, [Validators.required, Validators.min(0)]],
      currency: ['USD', Validators.required],
    });
  }

  ngOnInit() {
    this.crewCertificates = this.certificateService.certificates;
  }

  async onSubmit() {
    if (this.formGroup.valid) {
      const newCrew: Crew = {
        ...this.formGroup.value,
        id: uuidv4(),
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

      await this.crewService.addCrew(newCrew);
      this.closeModal();
    }
  }

  public closeModal() {
    this.router.navigate([{ outlets: { modal: null } }]);
  }
}
