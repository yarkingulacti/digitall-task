import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CertificateListComponent as ListComponent } from '../../../components/certificate/list/certificate-list.component';

@Component({
  imports: [RouterOutlet, ListComponent],
  selector: 'pages-certificate-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class CertificateListComponent {}
