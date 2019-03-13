'use strict';

// Import Angular modules
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Router } from '@angular/router';

/*
* @Injectable: AuthResolver
*
* Route resolvers allow us to provide the needed data for a route, before the route is activated.
* 
* This resolver is called for all routes which the user should not be allowed to view unless they
* are logged in.
*/

@Injectable()
export class AuthResolver implements Resolve<any> {
  public session: string;

  constructor(private router: Router) {}

  resolve() {
    this.session = sessionStorage.getItem('revelation-session');
    if (!this.session) this.router.navigate(['/revelation/auth']);
  }
}
