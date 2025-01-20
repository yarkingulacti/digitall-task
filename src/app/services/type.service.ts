import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import { certificateTypes } from '../certificate-types.data';
import { v4 as uuidv4 } from 'uuid';
import { TranslateHelper } from '../modules/translate-helper.module';

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

  constructor(private translateHelper: TranslateHelper) {
    this.certificateTypesSubject.next([...certificateTypes]);
  }

  get certificateTypesList() {
    return this.certificateTypesSubject.value;
  }

  getCertificateType(id: string) {
    return this.certificateTypesSubject.value.find((type) => type.id === id);
  }

  async createCertificateType(
    type: Omit<CertificateType, 'id'>
  ): Promise<boolean> {
    if (
      this.certificateTypesSubject.value.find(
        (existingType) =>
          existingType.title.toLowerCase() === type.title.toLowerCase()
      )
    ) {
      await Swal.fire({
        icon: 'error',
        title: await this.translateHelper.getTranslationByKey(
          'ADD_CERTIFICATE_TYPE_MODAL.ADD_ERROR.TITLE'
        ),
        text: await this.translateHelper.getTranslationByKey(
          'ADD_CERTIFICATE_TYPE_MODAL.ADD_ERROR.TEXT',
          {
            error: await this.translateHelper.getTranslationByKey(
              'ADD_CERTIFICATE_TYPE_MODAL.ADD_ERROR.TEXT'
            ),
          }
        ),
        confirmButtonText: await this.translateHelper.getTranslationByKey(
          'ADD_CERTIFICATE_TYPE_MODAL.ADD_ERROR.OK'
        ),
      });
      return false;
    }

    const newType: CertificateType = {
      ...type,
      id: uuidv4(),
    };

    const result = await Swal.fire({
      icon: 'question',
      title: await this.translateHelper.getTranslationByKey(
        'ADD_CERTIFICATE_TYPE_MODAL.ADD_CONFIRMATION.TITLE'
      ),
      text: await this.translateHelper.getTranslationByKey(
        'ADD_CERTIFICATE_TYPE_MODAL.ADD_CONFIRMATION.TEXT'
      ),
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: await this.translateHelper.getTranslationByKey(
        'ADD_CERTIFICATE_TYPE_MODAL.ADD_CONFIRMATION.CANCEL'
      ),
      confirmButtonText: await this.translateHelper.getTranslationByKey(
        'ADD_CERTIFICATE_TYPE_MODAL.ADD_CONFIRMATION.SUBMIT'
      ),
    });

    if (result.isConfirmed) {
      try {
        const updatedTypes = [...this.certificateTypesSubject.value, newType];
        this.certificateTypesSubject.next(updatedTypes);

        Swal.fire({
          icon: 'success',
          title: await this.translateHelper.getTranslationByKey(
            'ADD_CERTIFICATE_TYPE_MODAL.ADD_SUCCESS.TITLE'
          ),
        });
        return true;
      } catch (error) {
        console.error('Error adding certificate type:', error);
        return false;
      }
    }
    return false;
  }

  async editCertificateType(
    id: string,
    updatedType: CertificateType
  ): Promise<boolean> {
    const existingType = this.certificateTypesSubject.value.find(
      (type) =>
        type.id !== id &&
        type.title.toLowerCase() === updatedType.title.toLowerCase()
    );

    if (existingType) {
      await Swal.fire({
        icon: 'error',
        title: await this.translateHelper.getTranslationByKey(
          'ADD_CERTIFICATE_TYPE_MODAL.UPDATE_ERROR.TITLE'
        ),
        text: await this.translateHelper.getTranslationByKey(
          'ADD_CERTIFICATE_TYPE_MODAL.UPDATE_ERROR.TEXT'
        ),
        confirmButtonText: await this.translateHelper.getTranslationByKey(
          'ADD_CERTIFICATE_TYPE_MODAL.UPDATE_ERROR.OK'
        ),
      });
      return false;
    }

    const result = await Swal.fire({
      icon: 'question',
      title: await this.translateHelper.getTranslationByKey(
        'ADD_CERTIFICATE_TYPE_MODAL.UPDATE_CONFIRMATION.TITLE'
      ),
      text: await this.translateHelper.getTranslationByKey(
        'ADD_CERTIFICATE_TYPE_MODAL.UPDATE_CONFIRMATION.TEXT'
      ),
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: await this.translateHelper.getTranslationByKey(
        'ADD_CERTIFICATE_TYPE_MODAL.UPDATE_CONFIRMATION.CANCEL'
      ),
      confirmButtonText: await this.translateHelper.getTranslationByKey(
        'ADD_CERTIFICATE_TYPE_MODAL.UPDATE_CONFIRMATION.SUBMIT'
      ),
    });

    if (!result.isConfirmed) {
      return false;
    }

    try {
      const updatedTypes = this.certificateTypesSubject.value.map((type) =>
        type.id === id ? updatedType : type
      );
      this.certificateTypesSubject.next(updatedTypes);

      await Swal.fire({
        icon: 'success',
        title: await this.translateHelper.getTranslationByKey(
          'ADD_CERTIFICATE_TYPE_MODAL.UPDATE_SUCCESS.TITLE'
        ),
        text: await this.translateHelper.getTranslationByKey(
          'ADD_CERTIFICATE_TYPE_MODAL.UPDATE_SUCCESS.TEXT'
        ),
        confirmButtonText: await this.translateHelper.getTranslationByKey(
          'ADD_CERTIFICATE_TYPE_MODAL.UPDATE_SUCCESS.OK'
        ),
      });
      return true;
    } catch (error: any) {
      await Swal.fire({
        icon: 'error',
        title: await this.translateHelper.getTranslationByKey(
          'ADD_CERTIFICATE_TYPE_MODAL.UPDATE_ERROR.TITLE'
        ),
        text: await this.translateHelper.getTranslationByKey(
          'ADD_CERTIFICATE_TYPE_MODAL.UPDATE_ERROR.TEXT',
          {
            error: error.message,
          }
        ),
        confirmButtonText: await this.translateHelper.getTranslationByKey(
          'ADD_CERTIFICATE_TYPE_MODAL.UPDATE_ERROR.OK'
        ),
      });
      return false;
    }
  }

  async deleteCertificateType(id: string) {
    Swal.fire({
      icon: 'warning',
      title: await this.translateHelper.getTranslationByKey(
        'CERTIFICATE_TYPES_LIST.DELETE_CONFIRMATION.TITLE'
      ),
      text: await this.translateHelper.getTranslationByKey(
        'CERTIFICATE_TYPES_LIST.DELETE_CONFIRMATION.TEXT'
      ),
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: await this.translateHelper.getTranslationByKey(
        'CERTIFICATE_TYPES_LIST.DELETE_CONFIRMATION.SUBMIT'
      ),
      cancelButtonText: await this.translateHelper.getTranslationByKey(
        'CERTIFICATE_TYPES_LIST.DELETE_CONFIRMATION.CANCEL'
      ),
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const updatedTypes = this.certificateTypesSubject.value.filter(
            (type) => type.id !== id
          );
          this.certificateTypesSubject.next(updatedTypes);

          Swal.fire({
            icon: 'success',
            title: await this.translateHelper.getTranslationByKey(
              'CERTIFICATE_TYPES_LIST.DELETE_SUCCESS.TITLE'
            ),
            text: await this.translateHelper.getTranslationByKey(
              'CERTIFICATE_TYPES_LIST.DELETE_SUCCESS.TEXT'
            ),
            confirmButtonText: await this.translateHelper.getTranslationByKey(
              'CERTIFICATE_TYPES_LIST.DELETE_SUCCESS.OK'
            ),
          });
        } catch (error: any) {
          Swal.fire({
            icon: 'error',
            title: await this.translateHelper.getTranslationByKey(
              'CERTIFICATE_TYPES_LIST.DELETE_ERROR.TITLE'
            ),
            text: await this.translateHelper.getTranslationByKey(
              'CERTIFICATE_TYPES_LIST.DELETE_ERROR.TEXT',
              {
                error: error.message,
              }
            ),
            confirmButtonText: await this.translateHelper.getTranslationByKey(
              'CERTIFICATE_TYPES_LIST.DELETE_ERROR.OK'
            ),
          });
        }
      }
    });
  }
}
