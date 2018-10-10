import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../router/routing.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from '../components/app.component';

import { OverviewModule } from '../modules/overview.module';
import { LogsModule } from '../modules/logs.module';

import { ParabolSidebarModule } from 'parabol-material';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    ParabolSidebarModule,
    OverviewModule,
    LogsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
