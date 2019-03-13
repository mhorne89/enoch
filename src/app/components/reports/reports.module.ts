import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { NgPipesModule } from 'ngx-pipes';

import { ReportsComponent } from '../reports/reports.component';

import { PipesModule } from '../../pipes/pipes.module';

import {
  ParabolTextModule,
  ParabolPendingModule
} from 'parabol-material';

@NgModule({
  declarations: [ ReportsComponent ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    NgPipesModule,
    NgxJsonViewerModule,
    ParabolTextModule,
    ParabolPendingModule,
    PipesModule
  ],
  bootstrap: [ ReportsComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ReportsModule { }
