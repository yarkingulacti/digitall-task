import { Component } from '@angular/core';
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
  selector: 'app-crew-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CrewCreateComponent {
  crewForm: FormGroup;
  titles: CrewMemberTitle[] = titles;
  currencies = ['USD', 'EUR', 'GBP'];

  constructor(
    private fb: FormBuilder,
    private crewService: CrewServiceService,
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

  onSubmit() {
    if (this.crewForm.valid) {
      const formValue = this.crewForm.value;
      const newCrew: CrewMember = {
        ...formValue,
        slug: slugify(`${formValue.first_name} ${formValue.last_name}`, {
          lower: true,
        }),
        total_income: formValue.days_on_board * formValue.daily_rate,
      };

      this.crewService.addCrew(newCrew);
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
