import { NgModule } from "@angular/core";
import * as m from '@angular/material';

@NgModule({
    imports: [
        m.MatButtonModule,
        m.MatCardModule,
        m.MatInputModule,
        m.MatToolbarModule
    ],
    exports: [
        m.MatButtonModule,
        m.MatCardModule,
        m.MatInputModule,
        m.MatToolbarModule
    ]
})
export class MaterialModule {

}