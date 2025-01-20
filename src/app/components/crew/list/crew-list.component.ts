import { AfterViewInit, Component, computed, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Crew } from '../../../../data/crew';
import { CrewService } from '../../../services/crew.service';

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
  standalone: true,
  selector: 'component-crew-list',
  templateUrl: './crew-list.component.html',
  styleUrl: './crew-list.component.scss',
})
export class CrewListComponent implements AfterViewInit {
  public dataSource = new MatTableDataSource<Crew>([]);
  public displayedColumns: string[] = [
    'first_name',
    'last_name',
    'nationality',
    'title',
    'certificates',
    'days_on_board',
    'daily_rate',
    'currency',
    'total_income',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(
    private crewService: CrewService,
    private router: Router,
    private translate: TranslateService
  ) {
    this.crewService.crewMembers$.subscribe((data) => {
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

  translateRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0) {
      return '0 / ' + length;
    }
    const start = page * pageSize + 1;
    const end = Math.min((page + 1) * pageSize, length);
    return this.translate.instant('CREW_LIST.TABLE_PAGING.LABEL', {
      start,
      end,
      total_count: length,
    });
  };

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  addCrew() {
    this.router.navigate([{ outlets: { modal: ['crew', 'create'] } }]);
  }

  editCrew(slug: string) {
    this.router.navigate([{ outlets: { modal: ['crew', slug, 'edit'] } }]);
  }

  async deleteCrew(slug: string) {
    this.crewService.deleteCrew(slug);
  }

  goCrewDetail(slug: string) {
    this.router.navigate(['crew', slug, 'detail']);
  }
}
