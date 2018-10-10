// Import Angular modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import custom components
import { OverviewComponent } from '../components/overview.component';
import { LogsComponent } from '../components/logs.component';

// Define routes
const routes: Routes = [
  {
    path: 'enoch', children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        component: OverviewComponent
      },
      {
        path: 'logs',
        component: LogsComponent
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: []
})
export class AppRoutingModule { }
