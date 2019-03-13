import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgPipesModule } from 'ngx-pipes';

import { PipesModule } from '../../pipes/pipes.module';

import { OverviewComponent } from './overview.component';

import {
  ParabolTextModule,
  ParabolPendingModule
} from 'parabol-material';

@NgModule({
  declarations: [ OverviewComponent ],
  imports: [
    BrowserModule,
    NgPipesModule,
    ParabolTextModule,
    ParabolPendingModule,
    PipesModule
  ],
  bootstrap: [ OverviewComponent ]
})
export class OverviewModule { }
