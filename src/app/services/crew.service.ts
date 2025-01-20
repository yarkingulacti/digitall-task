import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { Crew } from '../../data/types';
import crewMembers from '../../data/crew.data';
import { TranslateHelper } from '../modules/translate-helper.module';

@Injectable({
  providedIn: 'root',
})
export class CrewService {
  private crewSubject = new BehaviorSubject<Crew[]>(crewMembers);
  public crew$ = this.crewSubject.asObservable();

  constructor(private translateHelper: TranslateHelper) {}

  getCrews() {
    return this.crewSubject.value;
  }

  getCrew(slug: string) {
    return this.crewSubject.value.find((crew) => crew.slug === slug);
  }

  getCrewBySlug(slug: string) {
    return this.crewSubject.value.find((crew) => crew.slug === slug);
  }

  async addCrew(newCrew: Crew) {
    if (this.crewSubject.value.find((member) => member.slug === newCrew.slug)) {
      Swal.fire({
        icon: 'error',
        title: await this.translateHelper.getTranslationByKey(
          'DASHBOARD.ADD_CREW.ERROR.TITLE'
        ),
        text: await this.translateHelper.getTranslationByKey(
          'DASHBOARD.ADD_CREW.ERROR.TEXT',
          {
            error: this.translateHelper.getTranslationByKey(
              'DASHBOARD.ADD_CREW.ERRORS.SLUG_EXISTS'
            ),
          }
        ),
        confirmButtonText: await this.translateHelper.getTranslationByKey(
          'DASHBOARD.ADD_CREW.ERROR.OK'
        ),
      });

      return;
    }

    Swal.fire({
      icon: 'question',
      title: await this.translateHelper.getTranslationByKey(
        'DASHBOARD.ADD_CREW.CONFIRMATION.TITLE'
      ),
      text: await this.translateHelper.getTranslationByKey(
        'DASHBOARD.ADD_CREW.CONFIRMATION.TEXT'
      ),
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: await this.translateHelper.getTranslationByKey(
        'DASHBOARD.ADD_CREW.CONFIRMATION.CANCEL'
      ),
      confirmButtonText: await this.translateHelper.getTranslationByKey(
        'DASHBOARD.ADD_CREW.CONFIRMATION.SUBMIT'
      ),
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          this.crewSubject.next([...this.crewSubject.value, newCrew]);
          Swal.fire({
            icon: 'success',
            title: await this.translateHelper.getTranslationByKey(
              'DASHBOARD.ADD_CREW.SUCCESS.TITLE'
            ),
            text: await this.translateHelper.getTranslationByKey(
              'DASHBOARD.ADD_CREW.SUCCESS.TEXT'
            ),
            confirmButtonText: await this.translateHelper.getTranslationByKey(
              'DASHBOARD.ADD_CREW.SUCCESS.OK'
            ),
          });
        } catch (error: any) {
          Swal.fire({
            icon: 'error',
            title: await this.translateHelper.getTranslationByKey(
              'DASHBOARD.ADD_CREW.ERROR.TITLE'
            ),
            text: await this.translateHelper.getTranslationByKey(
              'DASHBOARD.ADD_CREW.ERROR.TEXT',
              {
                error: error.message,
              }
            ),
            confirmButtonText: await this.translateHelper.getTranslationByKey(
              'DASHBOARD.ADD_CREW.ERROR.OK'
            ),
          });
        }
      }
    });
  }

  async editCrew(slug: string, updatedCrew: Crew) {
    if (
      this.crewSubject.value.find(
        (crew) => crew.slug === updatedCrew.slug && crew.id !== updatedCrew.id
      )
    ) {
      Swal.fire({
        icon: 'error',
        title: await this.translateHelper.getTranslationByKey(
          'CREW_LIST.UPDATE_CREW.ERRORS.SLUG_EXISTS'
        ),
        timerProgressBar: true,
        timer: 3000,
      });
    } else {
      try {
        const updatedData = this.crewSubject.value.map((crew) =>
          crew.slug === slug ? updatedCrew : crew
        );
        this.crewSubject.next([...updatedData]);

        Swal.fire({
          icon: 'success',
          title: await this.translateHelper.getTranslationByKey(
            'CREW_LIST.UPDATE_CREW.SUCCESS.TITLE'
          ),
          text: await this.translateHelper.getTranslationByKey(
            'CREW_LIST.UPDATE_CREW.SUCCESS.TEXT'
          ),
          confirmButtonText: await this.translateHelper.getTranslationByKey(
            'CREW_LIST.UPDATE_CREW.SUCCESS.OK'
          ),
        });
      } catch (error: any) {
        Swal.fire({
          icon: 'error',
          title: await this.translateHelper.getTranslationByKey(
            'CREW_LIST.UPDATE_CREW.ERROR.TITLE'
          ),
          text: await this.translateHelper.getTranslationByKey(
            'CREW_LIST.UPDATE_CREW.ERROR.TEXT',
            {
              error: error.message,
            }
          ),
          confirmButtonText: await this.translateHelper.getTranslationByKey(
            'CREW_LIST.UPDATE_CREW.ERROR.OK'
          ),
        });
      }
    }
  }

  async deleteCrew(slug: string) {
    Swal.fire({
      icon: 'warning',
      title: await this.translateHelper.getTranslationByKey(
        'CREW_LIST.DELETE_CREW.CONFIRMATION.TITLE'
      ),
      text: await this.translateHelper.getTranslationByKey(
        'CREW_LIST.DELETE_CREW.CONFIRMATION.TEXT'
      ),
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: await this.translateHelper.getTranslationByKey(
        'CREW_LIST.DELETE_CREW.CONFIRMATION.CONFIRM_BUTTON'
      ),
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const updatedData = this.crewSubject.value.filter(
            (crew) => crew.slug !== slug
          );
          this.crewSubject.next([...updatedData]);

          Swal.fire({
            icon: 'success',
            title: await this.translateHelper.getTranslationByKey(
              'CREW_LIST.DELETE_CREW.SUCCESS.TITLE'
            ),
            text: await this.translateHelper.getTranslationByKey(
              'CREW_LIST.DELETE_CREW.SUCCESS.TEXT'
            ),
            confirmButtonText: await this.translateHelper.getTranslationByKey(
              'CREW_LIST.DELETE_CREW.SUCCESS.OK'
            ),
          });
        } catch (error: any) {
          Swal.fire({
            icon: 'error',
            title: await this.translateHelper.getTranslationByKey(
              'CREW_LIST.DELETE_CREW.ERROR.TITLE'
            ),
            text: await this.translateHelper.getTranslationByKey(
              'CREW_LIST.DELETE_CREW.ERROR.TEXT',
              {
                error: error.message,
              }
            ),
            confirmButtonText: await this.translateHelper.getTranslationByKey(
              'CREW_LIST.DELETE_CREW.ERROR.OK'
            ),
          });
        }
      }
    });
  }
}
