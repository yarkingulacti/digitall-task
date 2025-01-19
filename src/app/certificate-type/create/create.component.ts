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
import { CertificateTypeService } from '../../certificate-type-service.service';
import { CertificateType } from '../../../crew';
import Swal from 'sweetalert2';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatDialogModule,
  ],
  selector: 'app-certificate-type-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  standalone: true,
})
export class CertificateTypeCreateComponent {
  typeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private certificateTypeService: CertificateTypeService,
    private router: Router
  ) {
    this.typeForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.typeForm.valid) {
      const formValue = this.typeForm.value;
      const success = this.certificateTypeService.createCertificateType({
        title: formValue.title,
        description: formValue.description,
      });

      if (success) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Certificate type created successfully!',
          timerProgressBar: true,
          timer: 3000,
        });
        this.closeModal();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to create certificate type',
          timerProgressBar: true,
          timer: 3000,
        });
      }
    } else {
      this.typeForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.closeModal();
  }

  closeModal() {
    this.router.navigate(['certificate-type', { outlets: { modal: null } }]);
  }
}
