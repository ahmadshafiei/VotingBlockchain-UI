import {MatPaginatorIntl} from '@angular/material';
export class MatPaginatorIntlFa extends MatPaginatorIntl {
  itemsPerPageLabel = 'تعداد آیتم ها';
  nextPageLabel     = 'صفحه بعد';
  previousPageLabel = 'صفحه قبل';

  getRangeLabel = function (page, pageSize, length) {
    if (length === 0 || pageSize === 0) {
      return '0 از ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' از ' + length;
  };

}