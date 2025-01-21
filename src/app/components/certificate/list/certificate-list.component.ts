import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CertificateService } from '../../../services/certificate.service';
import { Certificate } from '../../../../data/types';

@Component({
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIcon,
    DatePipe,
    TranslateModule,
  ],
  standalone: true,
  selector: 'component-certificate-list',
  templateUrl: './certificate-list.component.html',
  styleUrls: ['./certificate-list.component.scss'],
})
export class CertificateListComponent implements AfterViewInit {
  public dataSource = new MatTableDataSource<Certificate>([]);
  public displayedColumns: string[] = [
    'title',
    'description',
    'type',
    'issue_date',
    'expiration_date',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(
    private certificateService: CertificateService,
    private router: Router,
    private translate: TranslateService
  ) {
    this.certificateService.certificates$.subscribe((data) => {
      this.dataSource.data = [...data];
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onAddClick() {
    this.router.navigate(['certificate', { outlets: { modal: ['create'] } }]);
  }

  onEditClick(id: string) {
    this.router.navigate(['certificate', { outlets: { modal: [id, 'edit'] } }]);
  }

  onDeleteClick(id: string) {
    this.certificateService.deleteCertificate(id);
  }
}
