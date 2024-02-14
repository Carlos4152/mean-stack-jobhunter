import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor() { }

  authenticatedUSer: boolean = false;

  setAuthenticatedUser(value : boolean):void {
    this.authenticatedUSer = value;
  };

  isAuthenticated(): boolean {
    return this.authenticatedUSer;
  }

}
