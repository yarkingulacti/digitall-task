import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import { certificateTypes } from '../certificate-types-data';
import { v4 as uuidv4 } from 'uuid';

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

  constructor() {
    this.certificateTypesSubject.next([...certificateTypes]);
  }

  get certificateTypesList() {
    return this.certificateTypesSubject.value;
  }

  getCertificateType(id: string) {
    return this.certificateTypesSubject.value.find((type) => type.id === id);
  }

  createCertificateType(type: Omit<CertificateType, 'id'>): boolean {
    if (
      this.certificateTypesSubject.value.find(
        (existingType) =>
          existingType.title.toLowerCase() === type.title.toLowerCase()
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
    }

    const newType: CertificateType = {
      ...type,
      id: uuidv4(),
    };

    const updatedTypes = [...this.certificateTypesSubject.value, newType];
    this.certificateTypesSubject.next(updatedTypes);

    return true;
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
