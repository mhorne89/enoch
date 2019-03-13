// Import Angular modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import custom components
import { AuthComponent } from '../components/auth/auth.component';
import { OverviewComponent } from '../components/overview/overview.component';
import { LogsComponent } from '../components/logs/logs.component';
import { ReportsComponent } from '../components/reports/reports.component';

// Import resolvers
import { AuthResolver } from '../resolvers/auth.resolver';

// Define routes
const routes: Routes = [
  { path: '', redirectTo: '/revelation/overview', pathMatch: 'full' },
  {
    path: 'revelation', children: [
      {
        path: '',
        redirectTo: 'reports',
        pathMatch: 'full'
      },
      {
        path: 'auth',
        component: AuthComponent
      },
      {
        path: 'overview',
        component: OverviewComponent,
        resolve: { auth: AuthResolver }
      },
      {
        path: 'logs',
        component: LogsComponent,
        resolve: { auth: AuthResolver }
      },
      {
        path: 'reports',
        component: ReportsComponent,
        resolve: { auth: AuthResolver }
      },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: []
})
export class AppRoutingModule { }
