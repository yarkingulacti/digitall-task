import { NgModule } from '@angular/core';
import {
  InterpolationParameters,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslateHelper {
  constructor(private translate: TranslateService) {}

  async getTranslationByKey(
    key: string,
    params?: InterpolationParameters
  ): Promise<string> {
    return firstValueFrom(this.translate.get(key, params));
  }
}

@NgModule({
  imports: [TranslateModule],
  providers: [TranslateHelper],
  exports: [TranslateModule],
})
export class TranslateHelperModule {}
