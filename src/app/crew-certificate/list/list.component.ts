import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CertificateListComponent } from '../../components/certificate-list/certificate-list.component';

@Component({
  imports: [RouterOutlet, CertificateListComponent],
  selector: 'app-crew-certificate-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class CrewCertificateListComponent {}
