import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { CertificateService } from '../../certificate-service.service';
import { CrewMemberCertificate } from '../../../crew';

@Component({
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIcon,
    DatePipe,
  ],
  selector: 'component-certificate-list',
  templateUrl: './certificate-list.component.html',
  styleUrls: ['./certificate-list.component.scss'],
})
export class CertificateListComponent implements AfterViewInit {
  public dataSource = new MatTableDataSource<CrewMemberCertificate>([]);
  public displayedColumns: string[] = [
    'title',
    'issue_date',
    'expiration_date',
    'description',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(
    private certificateService: CertificateService,
    private router: Router
  ) {
    this.certificateService.certificates$.subscribe((data) => {
      this.dataSource.data = [...data];
    });
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onAddClick() {
    this.router.navigate(['certificate', { outlets: { modal: ['create'] } }]);
  }

  onEditClick(id: string) {
    this.router.navigate(['certificate', id, 'edit']);
  }

  onDeleteClick(id: string) {
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
        this.certificateService.deleteCertificate(id);
        Swal.fire('Deleted!', 'Certificate has been deleted.', 'success');
      }
    });
  }
}
