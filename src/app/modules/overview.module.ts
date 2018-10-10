import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgPipesModule } from 'ngx-pipes';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { OverviewComponent } from '../components/overview.component';

import {
  ParabolTextModule,
  ParabolDatepickerModule,
  ParabolPendingModule
} from 'parabol-material';

@NgModule({
  declarations: [ OverviewComponent ],
  imports: [
    BrowserModule,
    NgPipesModule,
    AngularFontAwesomeModule,
    ParabolTextModule,
    ParabolDatepickerModule,
    ParabolPendingModule
  ],
  bootstrap: [ OverviewComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class OverviewModule { }
