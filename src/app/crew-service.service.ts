import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import { CrewMember } from '../crew';
import crewMembers from '../crew-data';

@Injectable({
  providedIn: 'root',
})
export class CrewServiceService {
  private crewMembersSubject = new BehaviorSubject<CrewMember[]>(crewMembers);
  public crewMembers$ = this.crewMembersSubject.asObservable();

  constructor() {}

  get crewMembers() {
    return this.crewMembersSubject.value;
  }

  getCrew(slug: string) {
    return this.crewMembersSubject.value.find((crew) => crew.slug === slug);
  }

  addCrew(newCrew: CrewMember) {
    if (
      this.crewMembersSubject.value.find((crew) => crew.slug === newCrew.slug)
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'A crew member with the same slug already exists.',
        timerProgressBar: true,
        timer: 3000,
      });
    } else {
      this.crewMembersSubject.next([...this.crewMembersSubject.value, newCrew]);
    }
  }

  editCrew(slug: string, updatedCrew: CrewMember) {
    if (
      this.crewMembersSubject.value.find(
        (crew) => crew.slug === updatedCrew.slug
      )
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'A crew member with the same slug already exists.',
        timerProgressBar: true,
        timer: 3000,
      });
    } else {
      const updatedData = this.crewMembersSubject.value.map((crew) => {
        if (crew.slug === slug) {
          return updatedCrew;
        }
        return crew;
      });
      this.crewMembersSubject.next([...updatedData]);
    }
  }

  deleteCrew(slug: string) {
    const updatedData = this.crewMembersSubject.value.filter(
      (crew) => crew.slug !== slug
    );
    this.crewMembersSubject.next([...updatedData]);
  }
}
