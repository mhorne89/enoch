import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../router/routing.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from '../components/app.component';

import { OverviewModule } from '../modules/overview.module';

import { ConichiSidebarModule } from 'conichi-material';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ConichiSidebarModule,
    OverviewModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
