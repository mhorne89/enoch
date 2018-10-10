// Import Angular modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import custom components
import { OverviewComponent } from '../components/overview.component';

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
