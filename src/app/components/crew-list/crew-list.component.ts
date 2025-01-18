import { AfterViewInit, Component, computed, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CrewMember } from '../../../crew';
import { CrewServiceService } from '../../crew-service.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  imports: [MatTableModule, MatTableModule, MatPaginatorModule, MatIcon],
  selector: 'component-crew-list',
  templateUrl: './crew-list.component.html',
  styleUrl: './crew-list.component.scss',
})
export class CrewListComponent implements AfterViewInit {
  public dataSource = new MatTableDataSource<CrewMember>([]);
  public displayedColumns: string[] = [
    'first_name',
    'last_name',
    'nationality',
    'title',
    'days_on_board',
    'daily_rate',
    'currency',
    'total_income',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private crewService: CrewServiceService, private router: Router) {
    this.crewService.crewMembers$.subscribe((data) => {
      this.dataSource.data = [...data];
    });
    this.dataSource.paginator = this.paginator;
  }

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

  editCrew(slug: string) {
    this.router.navigate(['crew', slug, 'edit']);
  }

  deleteCrew(slug: string) {
    this.crewService.deleteCrew(slug);
  }

  goCrewDetail(slug: string) {
    this.router.navigate(['crew', slug, 'detail']);
  }
}
