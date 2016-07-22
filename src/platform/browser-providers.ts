/*
 * These are globally available services in any component or any other service
 */

// Angular 2
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
// Angular 2 Http
import { HTTP_PROVIDERS } from '@angular/http';
// // Angular 2 Router
// import { provideRouter } from '@angular/router';
// Angular 2 forms
import { disableDeprecatedForms, provideForms } from '@angular/forms';

// AngularClass
// import { provideWebpack } from '@angularclass/webpack-toolkit';
// import { providePrefetchIdleCallbacks } from '@angularclass/request-idle-callback';


//import { routes, asyncRoutes, prefetchRouteCallbacks } from '../app/app.routes';
//import { APP_RESOLVER_PROVIDERS } from '../app/app.resolver';
/*
* Application Providers/Directives/Pipes
* providers/directives/pipes that only live in our browser environment
*/

import { provideStore } from '@ngrx/store';
import { peopleReducer } from '../app/reducers/peopleReducer';
import { partyFilter } from '../app/reducers/partyFilterReducer';
import { instrumentStore } from '@ngrx/store-devtools';
import { useLogMonitor } from '@ngrx/store-log-monitor';
import "angular2-materialize";

let ngrxStoreProviders = [
  provideStore({people: peopleReducer, partyFilter: partyFilter})
];

if (ENV === 'dev' || ENV === 'development') {
  ngrxStoreProviders.push(instrumentStore({
    monitor: useLogMonitor({
      visible: false,
      position: 'bottom'
    })
  }));
}

export const APPLICATION_PROVIDERS = [
  // new Angular 2 forms
  disableDeprecatedForms(),
  provideForms(),

  // provideWebpack(asyncRoutes),
  // providePrefetchIdleCallbacks(prefetchRouteCallbacks),

  ...HTTP_PROVIDERS,

  { provide: LocationStrategy, useClass: HashLocationStrategy }
];

export const PROVIDERS = [
  ...APPLICATION_PROVIDERS,
  ...ngrxStoreProviders
];
