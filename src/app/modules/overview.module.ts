import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgPipesModule } from 'ngx-pipes';

import { KeysPipe } from '../pipes/keys.pipe';

import { OverviewComponent } from '../components/overview.component';

import {
  ParabolTextModule,
  ParabolPendingModule
} from 'parabol-material';

@NgModule({
  declarations: [
    OverviewComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    NgPipesModule,
    ParabolTextModule,
    ParabolPendingModule
  ],
  bootstrap: [ OverviewComponent ]
})
export class OverviewModule { }
