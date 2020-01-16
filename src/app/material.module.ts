import { NgModule } from "@angular/core";
import * as m from '@angular/material';
import { MatPaginatorIntl } from '@angular/material';
import { MatPaginatorIntlFa } from './i18n/pagination/matPaginatorIntlFa.service';

@NgModule({
    imports: [
        m.MatButtonModule,
        m.MatCardModule,
        m.MatInputModule,
        m.MatToolbarModule,
        m.MatListModule,
        m.MatPaginatorModule,
        m.MatTableModule,
        m.MatCheckboxModule
    ],
    exports: [
        m.MatButtonModule,
        m.MatCardModule,
        m.MatInputModule,
        m.MatListModule,
        m.MatToolbarModule,
        m.MatPaginatorModule,
        m.MatTableModule,
        m.MatCheckboxModule
    ],
    providers: [
        { provide: MatPaginatorIntl, useClass: MatPaginatorIntlFa }
    ]
})
export class MaterialModule {

}