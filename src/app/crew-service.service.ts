import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

  deleteCrew(slug: string) {
    const updatedData = this.crewMembersSubject.value.filter(
      (crew) => crew.slug !== slug
    );
    this.crewMembersSubject.next([...updatedData]);
  }

  getCrew(slug: string) {
    return this.crewMembersSubject.value.find((crew) => crew.slug === slug);
  }

  editCrew(slug: string, updatedCrew: CrewMember) {
    const updatedData = this.crewMembersSubject.value.map((crew) => {
      if (crew.slug === slug) {
        return updatedCrew;
      }
      return crew;
    });
    this.crewMembersSubject.next([...updatedData]);
  }
}
