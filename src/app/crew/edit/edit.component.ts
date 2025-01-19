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
import { CrewServiceService } from '../../crew-service.service';
import { CrewMember, CrewMemberTitle } from '../../../crew';
import titles from '../../../title-data';
@Component({
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    MatDialogModule,
  ],
  selector: 'app-crew-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class CrewEditComponent implements OnInit {
  crewForm: FormGroup;
  crewMember: CrewMember | undefined;
  titles: CrewMemberTitle[] = titles;
  currencies = ['USD', 'EUR', 'GBP'];

  constructor(
    private fb: FormBuilder,
    private crewService: CrewServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.crewForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      nationality: ['', Validators.required],
      title: ['', Validators.required],
      days_on_board: [0, [Validators.required, Validators.min(0)]],
      daily_rate: [0, [Validators.required, Validators.min(0)]],
      currency: ['USD', Validators.required],
    });
  }

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.crewMember = this.crewService.getCrew(slug);
      if (this.crewMember) {
        this.crewForm.patchValue(this.crewMember);
      }
    }
  }

  onSubmit() {
    if (this.crewForm.valid && this.crewMember) {
      const updatedCrew: CrewMember = {
        ...this.crewMember,
        ...this.crewForm.value,
        slug: slugify(
          `${this.crewForm.value.first_name} ${this.crewForm.value.last_name}`,
          { lower: true }
        ),
        total_income:
          this.crewForm.value.days_on_board * this.crewForm.value.daily_rate,
      };
      this.crewService.editCrew(this.crewMember.slug, updatedCrew);
      this.closeModal();
    }
  }

  onCancel() {
    this.closeModal();
  }

  private closeModal() {
    this.router.navigate([{ outlets: { modal: null } }]);
  }
}
