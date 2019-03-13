import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../router/routing.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';

import { AuthModule } from '../auth/auth.module';
import { OverviewModule } from '../overview/overview.module';
import { LogsModule } from '../logs/logs.module';
import { ReportsModule } from '../reports/reports.module';

import { AuthResolver } from '../../resolvers/auth.resolver';

import { ParabolSidebarModule } from 'parabol-material';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    ParabolSidebarModule,
    AuthModule,
    OverviewModule,
    LogsModule,
    ReportsModule,
    HttpClientModule
  ],
  providers: [ AuthResolver ],
  bootstrap: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
