import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import certificates from '../../data/certificates.data';
import { Certificate } from '../../data/types';
import { TranslateHelper } from '../modules/translate-helper.module';

@Injectable({
  providedIn: 'root',
})
export class CertificateService {
  private certificatesSubject = new BehaviorSubject<Certificate[]>(
    certificates
  );
  public certificates$ = this.certificatesSubject.asObservable();

  constructor(private translateHelper: TranslateHelper) {}

  get certificates() {
    return this.certificatesSubject.value;
  }

  getCertificate(id: string) {
    return this.certificatesSubject.value.find((cert) => cert.id === id);
  }

  async addCertificate(newCertificate: Certificate) {
    if (
      this.certificatesSubject.value.find(
        (cert) => cert.title === newCertificate.title
      )
    ) {
      Swal.fire({
        icon: 'error',
        title: await this.translateHelper.getTranslationByKey(
          'ADD_CERTIFICATE_MODAL.ADD_ERROR.TITLE'
        ),
        text: await this.translateHelper.getTranslationByKey(
          'ADD_CERTIFICATE_MODAL.ADD_ERROR.TEXT'
        ),
        confirmButtonText: await this.translateHelper.getTranslationByKey(
          'ADD_CERTIFICATE_MODAL.ADD_ERROR.OK'
        ),
      });
      return;
    }

    Swal.fire({
      icon: 'question',
      title: await this.translateHelper.getTranslationByKey(
        'ADD_CERTIFICATE_MODAL.ADD_CONFIRMATION.TITLE'
      ),
      text: await this.translateHelper.getTranslationByKey(
        'ADD_CERTIFICATE_MODAL.ADD_CONFIRMATION.TEXT'
      ),
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: await this.translateHelper.getTranslationByKey(
        'ADD_CERTIFICATE_MODAL.ADD_CONFIRMATION.CANCEL'
      ),
      confirmButtonText: await this.translateHelper.getTranslationByKey(
        'ADD_CERTIFICATE_MODAL.ADD_CONFIRMATION.SUBMIT'
      ),
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          this.certificatesSubject.next([
            ...this.certificatesSubject.value,
            newCertificate,
          ]);
          Swal.fire({
            icon: 'success',
            title: await this.translateHelper.getTranslationByKey(
              'ADD_CERTIFICATE_MODAL.ADD_SUCCESS.TITLE'
            ),
            text: await this.translateHelper.getTranslationByKey(
              'ADD_CERTIFICATE_MODAL.ADD_SUCCESS.TEXT'
            ),
            confirmButtonText: await this.translateHelper.getTranslationByKey(
              'ADD_CERTIFICATE_MODAL.ADD_SUCCESS.OK'
            ),
          });
        } catch (error: any) {
          Swal.fire({
            icon: 'error',
            title: await this.translateHelper.getTranslationByKey(
              'ADD_CERTIFICATE_MODAL.ADD_ERROR.TITLE'
            ),
            text: await this.translateHelper.getTranslationByKey(
              'ADD_CERTIFICATE_MODAL.ADD_ERROR.TEXT',
              {
                error: error.message,
              }
            ),
            confirmButtonText: await this.translateHelper.getTranslationByKey(
              'ADD_CERTIFICATE_MODAL.ADD_ERROR.OK'
            ),
          });
        }
      }
    });
  }

  async editCertificate(id: string, updatedCertificate: Certificate) {
    const duplicateTitle = this.certificatesSubject.value.find(
      (cert) =>
        cert.id !== id &&
        cert.title.toLowerCase() === updatedCertificate.title.toLowerCase()
    );

    if (duplicateTitle) {
      Swal.fire({
        icon: 'error',
        title: await this.translateHelper.getTranslationByKey(
          'CERTIFICATE_UPDATE_MODAL.UPDATE_ERROR.TITLE'
        ),
        text: await this.translateHelper.getTranslationByKey(
          'CERTIFICATE_UPDATE_MODAL.UPDATE_ERROR.TEXT'
        ),
        confirmButtonText: await this.translateHelper.getTranslationByKey(
          'CERTIFICATE_UPDATE_MODAL.UPDATE_ERROR.OK'
        ),
      });
      return false;
    }

    try {
      const updatedCertificates = this.certificatesSubject.value.map((cert) =>
        cert.id === id ? updatedCertificate : cert
      );
      this.certificatesSubject.next([...updatedCertificates]);

      Swal.fire({
        icon: 'success',
        title: await this.translateHelper.getTranslationByKey(
          'CERTIFICATE_UPDATE_MODAL.UPDATE_SUCCESS.TITLE'
        ),
        text: await this.translateHelper.getTranslationByKey(
          'CERTIFICATE_UPDATE_MODAL.UPDATE_SUCCESS.TEXT'
        ),
        confirmButtonText: await this.translateHelper.getTranslationByKey(
          'CERTIFICATE_UPDATE_MODAL.UPDATE_SUCCESS.OK'
        ),
      });
      return true;
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: await this.translateHelper.getTranslationByKey(
          'CERTIFICATE_UPDATE_MODAL.UPDATE_ERROR.TITLE'
        ),
        text: await this.translateHelper.getTranslationByKey(
          'CERTIFICATE_UPDATE_MODAL.UPDATE_ERROR.TEXT',
          {
            error: error.message,
          }
        ),
        confirmButtonText: await this.translateHelper.getTranslationByKey(
          'CERTIFICATE_UPDATE_MODAL.UPDATE_ERROR.OK'
        ),
      });
      return false;
    }
  }

  async deleteCertificate(id: string) {
    Swal.fire({
      icon: 'warning',
      title: await this.translateHelper.getTranslationByKey(
        'CERTIFICATE_LIST.DELETE_CONFIRMATION.TITLE'
      ),
      text: await this.translateHelper.getTranslationByKey(
        'CERTIFICATE_LIST.DELETE_CONFIRMATION.TEXT'
      ),
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: await this.translateHelper.getTranslationByKey(
        'CERTIFICATE_LIST.DELETE_CONFIRMATION.SUBMIT'
      ),
      cancelButtonText: await this.translateHelper.getTranslationByKey(
        'CERTIFICATE_LIST.DELETE_CONFIRMATION.CANCEL'
      ),
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const updatedCertificates = this.certificatesSubject.value.filter(
            (cert) => cert.id !== id
          );
          this.certificatesSubject.next([...updatedCertificates]);

          Swal.fire({
            icon: 'success',
            title: await this.translateHelper.getTranslationByKey(
              'CERTIFICATE_LIST.DELETE_SUCCESS.TITLE'
            ),
            text: await this.translateHelper.getTranslationByKey(
              'CERTIFICATE_LIST.DELETE_SUCCESS.TEXT'
            ),
            confirmButtonText: await this.translateHelper.getTranslationByKey(
              'CERTIFICATE_LIST.DELETE_SUCCESS.OK'
            ),
          });
        } catch (error: any) {
          Swal.fire({
            icon: 'error',
            title: await this.translateHelper.getTranslationByKey(
              'CERTIFICATE_LIST.DELETE_ERROR.TITLE'
            ),
            text: await this.translateHelper.getTranslationByKey(
              'CERTIFICATE_LIST.DELETE_ERROR.TEXT',
              {
                error: error.message,
              }
            ),
            confirmButtonText: await this.translateHelper.getTranslationByKey(
              'CERTIFICATE_LIST.DELETE_ERROR.OK'
            ),
          });
        }
      }
    });
  }
}
