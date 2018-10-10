import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgPipesModule } from 'ngx-pipes';

import { LogsComponent } from '../components/logs.component';

import {
  ParabolTextModule,
  ParabolPendingModule
} from 'parabol-material';

@NgModule({
  declarations: [ LogsComponent ],
  imports: [
    BrowserModule,
    NgPipesModule,
    ParabolTextModule,
    ParabolPendingModule
  ],
  bootstrap: [ LogsComponent ]
})
export class LogsModule { }
