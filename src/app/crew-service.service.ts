import { Injectable } from '@angular/core';
import { CrewMember } from '../crew-data';

@Injectable({
  providedIn: 'root',
})
export class CrewServiceService {
  public crewMembers: CrewMember[] = [];

  constructor() {}
}
