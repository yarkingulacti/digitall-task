import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { nationalities } from '../../../../data/nationalities.data';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'components-crew-crud-nationalities',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormGroup,
    TranslateModule,
    CommonModule,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  standalone: true,
})
export class ComponentsCrewCrudNationalitiesComponent {
  @Input() nationality?: string;

  nationalities = nationalities;
}
