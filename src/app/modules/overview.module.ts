import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgPipesModule } from 'ngx-pipes';

import { OverviewComponent } from '../components/overview.component';

import {
  ConichiTextModule,
  ConichiDatepickerModule,
  ConichiPendingModule
} from 'conichi-material';

@NgModule({
  declarations: [ OverviewComponent ],
  imports: [
    BrowserModule,
    NgPipesModule,
    ConichiTextModule,
    ConichiDatepickerModule,
    ConichiPendingModule
  ],
  bootstrap: [ OverviewComponent ]
})
export class OverviewModule { }
