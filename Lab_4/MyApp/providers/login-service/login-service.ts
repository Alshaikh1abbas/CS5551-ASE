import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LoginServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello LoginServiceProvider Provider');
  }

  // nativeLogin(): Promise<any> {
  //   let self = this;
  //   return this.GooglePlus.login({
  //     'scopes': 'profile email',
  //     'webClientId': CLIENT_ID, // This is the web client ID that you copied earlier.
  //     'offline': true
  //   })
  //     .then(userData => {
  //       // Do your stuff... like, 'self.events.publish(LOGGED_IN_EVENT_ID, userData);'
  //     });
  // }

}
