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
import Swal from 'sweetalert2';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import {
  CertificateTypeService,
  CertificateType,
} from '../../../services/type.service';

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
  selector: 'app-certificate-type-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class CertificateTypeEditComponent implements OnInit {
  typeForm: FormGroup;
  typeId: string = '';

  constructor(
    private fb: FormBuilder,
    private certificateTypeService: CertificateTypeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.typeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.typeId = this.route.snapshot.params['id'];
    const certificateType = this.certificateTypeService.getCertificateType(
      this.typeId
    );

    if (certificateType) {
      this.typeForm.patchValue({
        title: certificateType.title,
        description: certificateType.description,
      });
    } else {
      this.closeModal();
    }
  }

  async onSubmit() {
    if (this.typeForm.valid) {
      const formValue = this.typeForm.value;
      const updatedType: CertificateType = {
        id: this.typeId,
        ...formValue,
      };

      const success = await this.certificateTypeService.editCertificateType(
        this.typeId,
        updatedType
      );
      if (success) {
        this.closeModal();
      }
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
    this.router.navigate(['certificate-type', { outlets: { modal: null } }]);
  }
}
