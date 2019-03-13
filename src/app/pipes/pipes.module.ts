import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TimeFromPipe } from './from.pipe';
import { KeysPipe } from './keys.pipe';


@NgModule({
  declarations: [
    TimeFromPipe,
    KeysPipe
  ],
  exports: [
    TimeFromPipe,
    KeysPipe
  ]
})
export class PipesModule { }
