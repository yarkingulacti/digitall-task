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
  selector: 'app-crew-certificate-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CrewCertificateCreateComponent {
  certificateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private certificateService: CertificateService,
    private router: Router
  ) {
    this.certificateForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      issue_date: [null, Validators.required],
      expiration_date: [null],
    });
  }

  onSubmit() {
    if (this.certificateForm.valid) {
      const formValue = this.certificateForm.value;
      const certificate: CrewMemberCertificate = {
        id: crypto.randomUUID(),
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

  onCancel() {
    this.closeModal();
  }

  private closeModal() {
    this.router.navigate(['certificate', { outlets: { modal: null } }]);
  }
}
