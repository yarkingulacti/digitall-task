import { AfterViewInit, Component, computed, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CrewMember } from '../../../crew';
import { CrewServiceService } from '../../crew-service.service';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';

@Component({
  imports: [
    RouterLink,
    RouterOutlet,
    MatTableModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIcon,
  ],
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
    'certificates',
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

  addCrew() {
    this.router.navigate([{ outlets: { modal: ['crew', 'create'] } }]);
  }

  editCrew(slug: string) {
    this.router.navigate([{ outlets: { modal: ['crew', slug, 'edit'] } }]);
  }

  deleteCrew(slug: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Crew member has been deleted.', 'success');
        this.deleteCrewConfirm(slug);
      }
    });
  }

  deleteCrewConfirm(slug: string) {
    this.crewService.deleteCrew(slug);
  }

  goCrewDetail(slug: string) {
    this.router.navigate(['crew', slug, 'detail']);
  }
}
