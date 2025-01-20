import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatIconModule,
    SidebarComponent,
    FooterComponent,
    MatSelectModule,
    TranslateModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  public appLanguage = 'tr';
  public languages = [
    {
      code: 'tr',
      name: 'Türkçe',
    },
    {
      code: 'en',
      name: 'English',
    },
    {
      code: 'pt',
      name: 'Português',
    },
  ];

  constructor(public translate: TranslateService) {}

  getSelectedLanguage() {
    return this.languages.find((lang) => lang.code === this.appLanguage);
  }
}
