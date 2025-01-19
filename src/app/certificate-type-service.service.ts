import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

export interface CertificateType {
  id: string;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class CertificateTypeService {
  private certificateTypesSubject = new BehaviorSubject<CertificateType[]>([]);
  public certificateTypes$ = this.certificateTypesSubject.asObservable();

  constructor() {}

  get certificateTypes() {
    return this.certificateTypesSubject.value;
  }

  getCertificateType(id: string) {
    return this.certificateTypesSubject.value.find((type) => type.id === id);
  }

  addCertificateType(newType: CertificateType) {
    if (
      this.certificateTypesSubject.value.find(
        (type) => type.title.toLowerCase() === newType.title.toLowerCase()
      )
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'A certificate type with the same title already exists.',
        timerProgressBar: true,
        timer: 3000,
      });
      return false;
    } else {
      this.certificateTypesSubject.next([
        ...this.certificateTypesSubject.value,
        newType,
      ]);
      return true;
    }
  }

  editCertificateType(id: string, updatedType: CertificateType) {
    const existingType = this.certificateTypesSubject.value.find(
      (type) => 
        type.id !== id && 
        type.title.toLowerCase() === updatedType.title.toLowerCase()
    );

    if (existingType) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'A certificate type with the same title already exists.',
        timerProgressBar: true,
        timer: 3000,
      });
      return false;
    } else {
      const updatedTypes = this.certificateTypesSubject.value.map((type) =>
        type.id === id ? updatedType : type
      );
      this.certificateTypesSubject.next(updatedTypes);
      return true;
    }
  }

  deleteCertificateType(id: string) {
    const updatedTypes = this.certificateTypesSubject.value.filter(
      (type) => type.id !== id
    );
    this.certificateTypesSubject.next(updatedTypes);
  }
}
