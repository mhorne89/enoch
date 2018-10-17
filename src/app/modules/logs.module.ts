import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgPipesModule } from 'ngx-pipes';

import { TimeFromPipe } from '../pipes/from.pipe';

import { LogsComponent } from '../components/logs.component';

import {
  ParabolTextModule,
  ParabolPendingModule
} from 'parabol-material';

@NgModule({
  declarations: [
    LogsComponent,
    TimeFromPipe
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    NgPipesModule,
    ParabolTextModule,
    ParabolPendingModule
  ],
  bootstrap: [ LogsComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LogsModule { }
