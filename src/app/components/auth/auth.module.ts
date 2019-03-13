import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../router/routing.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AuthComponent } from '../auth/auth.component';

import { ParabolTextModule, ParabolNotificationModule } from 'parabol-material';

@NgModule({
  declarations: [ AuthComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    ParabolTextModule,
    ParabolNotificationModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [ AuthComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AuthModule { }
