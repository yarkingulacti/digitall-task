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
import Swal from 'sweetalert2';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { CertificateTypeService } from '../../../../services/certificate-type.service';

@Component({
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatDialogModule,
    TranslateModule,
  ],
  selector: 'pages-certificate-type-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CertificateTypeCreateComponent {
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private certificateTypeService: CertificateTypeService,
    private router: Router
  ) {
    this.formGroup = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    if (this.formGroup.valid) {
      const formValue = this.formGroup.value;
      const success = await this.certificateTypeService.createCertificateType({
        title: formValue.title,
        description: formValue.description,
      });
      if (success) {
        this.closeModal();
      }
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  onCancel() {
    this.closeModal();
  }

  closeModal() {
    this.router.navigate(['certificate-type', { outlets: { modal: null } }]);
  }
}
