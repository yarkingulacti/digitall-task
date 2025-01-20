import { AfterViewInit, Component, ViewChild, computed } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { Crew } from '../../../data/types';
import { CrewService } from '../../services/crew.service';

@Component({
  imports: [
    RouterLink,
    RouterOutlet,
    MatTableModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIcon,
    TranslateModule,
  ],
  selector: 'pages-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements AfterViewInit {
  public dataSource = new MatTableDataSource<Crew>([]);
  public displayedColumns: string[] = [
    'first_name',
    'last_name',
    'nationality',
    'title',
    'days_on_board',
    'daily_rate',
    'total_income',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(public router: Router, private crewService: CrewService) {
    this.crewService.crew$.subscribe((data) => {
      this.dataSource.data = [...data];
    });
  }

  public formatCurrency(value: number, currency: 'USD' | 'EUR' | 'GBP') {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(value);
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

  onCrewDelete(id: string) {
    this.crewService.deleteCrew(id);
  }
}
