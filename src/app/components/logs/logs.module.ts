import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgPipesModule } from 'ngx-pipes';

import { LogsComponent } from './logs.component';

import { PipesModule } from '../../pipes/pipes.module';

import {
  ParabolTextModule,
  ParabolPendingModule
} from 'parabol-material';

@NgModule({
  declarations: [ LogsComponent ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    NgPipesModule,
    ParabolTextModule,
    ParabolPendingModule,
    PipesModule
  ],
  bootstrap: [ LogsComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LogsModule { }
