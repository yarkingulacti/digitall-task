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
import { CertificateService } from '../../certificate-service.service';
import { CrewMemberCertificate } from '../../../crew';
import Swal from 'sweetalert2';

@Component({
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  selector: 'app-crew-certificate-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class CrewCertificateEditComponent implements OnInit {
  certificateForm: FormGroup;
  certificateId: string = '';

  constructor(
    private fb: FormBuilder,
    private certificateService: CertificateService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.certificateForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
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

        this.certificateForm.patchValue({
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
  }

  onSubmit() {
    if (this.certificateForm.valid) {
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

      const formValue = this.certificateForm.value;
      const updatedCertificate: CrewMemberCertificate = {
        id: this.certificateId,
        title: formValue.title,
        description: formValue.description,
        issue_date: formValue.issue_date,
        expiration_date: formValue.expiration_date,
        type: currentCertificate?.type,
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

  private closeModal() {
    this.router.navigate(['/certificate/list', { outlets: { modal: null } }]);
  }
}
