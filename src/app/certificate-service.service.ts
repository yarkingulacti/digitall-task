import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import certificates from '../certificate-data';
import { CrewMemberCertificate } from '../crew';

@Injectable({
  providedIn: 'root',
})
export class CertificateService {
  private certificatesSubject = new BehaviorSubject<CrewMemberCertificate[]>(
    certificates
  );
  public certificates$ = this.certificatesSubject.asObservable();

  constructor() {}

  get certificates() {
    return this.certificatesSubject.value;
  }

  getCertificate(id: string) {
    return this.certificatesSubject.value.find((cert) => cert.id === id);
  }

  addCertificate(newCertificate: CrewMemberCertificate) {
    if (
      this.certificatesSubject.value.find(
        (cert) => cert.title === newCertificate.title
      )
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'A certificate with the same title already exists.',
        timerProgressBar: true,
        timer: 3000,
      });
    } else {
      this.certificatesSubject.next([
        ...this.certificatesSubject.value,
        newCertificate,
      ]);
    }
  }

  editCertificate(id: string, updatedCertificate: CrewMemberCertificate) {
    if (
      this.certificatesSubject.value.find(
        (cert) => cert.title !== updatedCertificate.title
      )
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'A certificate with the same title already exists.',
        timerProgressBar: true,
        timer: 3000,
      });
    } else {
      const updatedCertificates = this.certificatesSubject.value.map((cert) =>
        cert.id === id ? updatedCertificate : cert
      );
      this.certificatesSubject.next(updatedCertificates);
    }
  }

  deleteCertificate(id: string) {
    const updatedCertificates = this.certificatesSubject.value.filter(
      (cert) => cert.id !== id
    );
    this.certificatesSubject.next(updatedCertificates);
  }
}
