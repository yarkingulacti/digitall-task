import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { CertificateType } from '../../../../crew';
import { CertificateTypeService } from '../../../services/type.service';

@Component({
  imports: [
    RouterOutlet,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIcon,
    TranslateModule,
  ],
  selector: 'app-certificate-type-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class CertificateTypeListComponent implements AfterViewInit {
  public dataSource = new MatTableDataSource<CertificateType>([]);
  public displayedColumns: string[] = ['title', 'description', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(
    private router: Router,
    private certificateTypeService: CertificateTypeService
  ) {
    this.certificateTypeService.certificateTypes$.subscribe((data) => {
      this.dataSource.data = [...data];
    });
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  onAddClick() {
    this.router.navigate([
      'certificate-type',
      { outlets: { modal: ['create'] } },
    ]);
  }

  editCertificateType(certificateType: CertificateType) {
    this.router.navigate([
      'certificate-type',
      {
        outlets: { modal: [certificateType.id, 'edit'] },
      },
    ]);
  }

  deleteCertificateType(id: string) {
    this.certificateTypeService.deleteCertificateType(id);
  }
}
