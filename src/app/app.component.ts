import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { FooterComponent } from './components/layout/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [
    TranslateModule,
    RouterOutlet,
    MatIconModule,
    SidebarComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['tr', 'pt', 'en']);
    this.translate.setDefaultLang('tr');
    this.translate.use(this.translate.getBrowserLang() || 'tr');
  }
}
