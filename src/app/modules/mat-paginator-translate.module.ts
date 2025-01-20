import { TranslateService } from '@ngx-translate/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';

export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  constructor(private translate: TranslateService) {
    super();

    // Wait for translations to be loaded
    this.translate.get('GLOBAL.LIST.TABLE_PAGE_SIZE.LABEL').subscribe(() => {
      this.updateTranslations();
      this.changes.next();
    });

    // Subscribe to language changes
    this.translate.onLangChange.subscribe(() => {
      this.updateTranslations();
      this.changes.next();
    });
  }

  override firstPageLabel = '';
  override itemsPerPageLabel = '';
  override lastPageLabel = '';
  override nextPageLabel = '';
  override previousPageLabel = '';

  private updateTranslations(): void {
    this.itemsPerPageLabel = this.translate.instant(
      'GLOBAL.LIST.TABLE_PAGE_SIZE.LABEL'
    );
    this.nextPageLabel = this.translate.instant(
      'GLOBAL.LIST.TABLE_PAGING.NEXT'
    );
    this.previousPageLabel = this.translate.instant(
      'GLOBAL.LIST.TABLE_PAGING.PREVIOUS'
    );
    this.firstPageLabel = this.translate.instant(
      'GLOBAL.LIST.TABLE_PAGING.FIRST_PAGE_LABEL'
    );
    this.lastPageLabel = this.translate.instant(
      'GLOBAL.LIST.TABLE_PAGING.LAST_PAGE_LABEL'
    );
    
    // Ensure changes are propagated
    this.changes.next();
  }

  override getRangeLabel = (
    page: number,
    pageSize: number,
    length: number
  ): string => {
    if (length === 0) {
      return this.translate.instant('GLOBAL.LIST.TABLE_PAGING.LABEL', {
        start: 0,
        end: 0,
        total_count: length,
      });
    }

    const start = page * pageSize + 1;
    const end = Math.min((page + 1) * pageSize, length);

    return this.translate.instant('GLOBAL.LIST.TABLE_PAGING.LABEL', {
      start,
      end,
      total_count: length,
    });
  };
}

export class MatPaginatorTranslateI18N {
  constructor(private readonly translate: TranslateService) {}

  getPaginatorIntl(): MatPaginatorIntl {
    return new CustomMatPaginatorIntl(this.translate);
  }
}
