import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'pages-certificate-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class CertificateEditComponent implements OnInit {
  formGroup: FormGroup;
  certificateId: string = '';
  certificateTypes: CertificateType[] = [];

  constructor(
    private fb: FormBuilder,
    private certificateService: CertificateService,
    private certificateTypeService: CertificateTypeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formGroup = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      type: [null, Validators.required],
      issue_date: [null, Validators.required],
      expiration_date: [null],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.certificateId = params['id'];

      const certificate = this.certificateService.getCertificate(
        this.certificateId
      );

      if (certificate) {
        // Convert string dates to Date objects for the form
        const issueDate = certificate.issue_date
          ? new Date(certificate.issue_date)
          : null;
        const expirationDate = certificate.expiration_date
          ? new Date(certificate.expiration_date)
          : null;

        this.formGroup.patchValue({
          title: certificate.title,
          description: certificate.description,
          issue_date: issueDate,
          expiration_date: expirationDate,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Certificate not found',
          timerProgressBar: true,
          timer: 3000,
        });
        this.closeModal();
      }
    });

    this.certificateTypes = this.certificateTypeService.certificateTypesList;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const certificate = this.certificateService.getCertificate(id);

      if (certificate) {
        this.formGroup.patchValue({
          ...certificate,
          type: certificate.type,
        });
      }
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const currentCertificate = this.certificateService.getCertificate(
        this.certificateId
      );
      if (!currentCertificate) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Certificate not found',
          timerProgressBar: true,
          timer: 3000,
        });
        this.closeModal();
        return;
      }

      const formValue = this.formGroup.value;
      const updatedCertificate: Certificate = {
        id: this.certificateId,
        title: formValue.title,
        description: formValue.description,
        issue_date: formValue.issue_date,
        expiration_date: formValue.expiration_date,
        type: formValue.type,
      };

      this.certificateService.editCertificate(
        this.certificateId,
        updatedCertificate
      );

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Certificate updated successfully',
        timerProgressBar: true,
        timer: 2000,
      }).then(() => {
        this.closeModal();
      });
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

  onCancel() {
    this.closeModal();
  }

  public closeModal() {
    this.router.navigate(['certificate', { outlets: { modal: null } }]);
  }
}
