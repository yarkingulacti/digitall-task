import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {
  constructor(private router: Router, private location: Location) {}

  onHomeClick() {
    this.router.navigate(['/']);
  }

  goBack() {
    this.location.back();
  }
}
