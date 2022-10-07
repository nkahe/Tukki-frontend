// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

let apiBaseUrl = 'http://localhost:3000/api';

// authentication here is for testing purposes only.
export const environment = {
  production: false,
  clientID: 'angularApp',
  ownLoginUrl: apiBaseUrl + '/echoheaders/',
  ownTokenUrl: apiBaseUrl + '/authtoken'
}

// ownLoginUrl: apiBaseUrl + '/login',


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
