import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  authentication() {
    if (window.localStorage.getItem('user')) {
      return true;
    }
    return false;
  }
}
