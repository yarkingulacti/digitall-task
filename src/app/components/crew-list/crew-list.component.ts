import { Component, computed, signal } from '@angular/core';
import { CrewMember } from '../../../crew';
import { CrewServiceService } from '../../crew-service.service';
import { MatTableModule } from '@angular/material/table';

@Component({
  imports: [MatTableModule],
  selector: 'component-crew-list',
  templateUrl: './crew-list.component.html',
  styleUrl: './crew-list.component.scss',
})
export class CrewListComponent {
  public dataSource = signal<CrewMember[]>([]);
  public displayedColumns: string[] = [
    'first_name',
    'last_name',
    'nationality',
    'title',
    'days_on_board',
    'daily_rate',
    'currency',
    'total_income',
  ];
  //TODO change this computed value to pipe every possible currency
  public totalIncome = computed(() =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(
      this.dataSource().reduce((acc, crew) => acc + crew.total_income, 0)
    )
  );

  constructor(private crewService: CrewServiceService) {
    this.dataSource.set(this.crewService.crewMembers);
  }
}
