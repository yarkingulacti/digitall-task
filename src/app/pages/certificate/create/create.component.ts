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
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import Swal from 'sweetalert2';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { CertificateService } from '../../../services/certificate.service';
import {
  CertificateType,
  CertificateTypeService,
} from '../../../services/certificate-type.service';
import { Certificate } from '../../../../data/crew';

@Component({
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    CommonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TranslateModule,
  ],
  selector: 'pages-certificate-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CertificateCreateComponent {
  formGroup: FormGroup;
  certificateTypes: CertificateType[] = [];

  constructor(
    private fb: FormBuilder,
    private certificateService: CertificateService,
    private certificateTypeService: CertificateTypeService,
    private router: Router
  ) {
    this.formGroup = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      type: [null, Validators.required],
      issue_date: [null, Validators.required],
      expiration_date: [null],
    });
    this.certificateTypes = this.certificateTypeService.certificateTypesList;
  }

  public onSubmit() {
    if (this.formGroup.valid) {
      const formValue = this.formGroup.value;
      const certificate: Certificate = {
        id: crypto.randomUUID(),
        type: formValue.type,
        ...formValue,
      };

      this.certificateService.addCertificate(certificate);
      this.closeModal();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill in all required fields.',
        timerProgressBar: true,
        timer: 3000,
      });
    }
  }

  public onCancel() {
    this.closeModal();
  }

  public closeModal() {
    this.router.navigate(['certificate', { outlets: { modal: null } }]);
  }
}
