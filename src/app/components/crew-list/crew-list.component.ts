import {
  AfterViewInit,
  Component,
  computed,
  signal,
  ViewChild,
} from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CrewMember } from '../../../crew';
import { CrewServiceService } from '../../crew-service.service';

@Component({
  imports: [MatTableModule, MatTableModule, MatPaginatorModule],
  selector: 'component-crew-list',
  templateUrl: './crew-list.component.html',
  styleUrl: './crew-list.component.scss',
})
export class CrewListComponent implements AfterViewInit {
  public dataSource = new MatTableDataSource<CrewMember>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

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
      this.dataSource.data.reduce((acc, crew) => acc + crew.total_income, 0)
    )
  );

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private crewService: CrewServiceService) {
    this.dataSource.data = this.crewService.crewMembers;
    this.dataSource.paginator = this.paginator;
  }
}
