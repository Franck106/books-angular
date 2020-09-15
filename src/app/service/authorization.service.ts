import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  cognitoUser: any;
  poolData = {
    UserPoolId: 'eu-west-1_ma46Ui5un',
    ClientId: '1tq72qsogjuogs3n09k96gpuu9'
  };
  userPool = new CognitoUserPool(this.poolData);

  constructor() { }

  register(email: string, password: string) {
    const attributeList: CognitoUserAttribute[] = [];
    const attributeList2: CognitoUserAttribute[] = [];
    return new Observable<any>(observer => {
      this.userPool.signUp(email, password, attributeList, attributeList2, (err, result) => {
        if(err) {
          console.log(JSON.stringify(err));
          observer.error(err);
        }
        this.cognitoUser = result?.user;
        console.log('signUp success', result);
        observer.next(result);
        observer.complete();
      })
    });
  }

  signIn(email: string, password: string) {
    const authenticationdata = {
      Username: email,
      Password: password,
    }
    const authenticationDetails = new AuthenticationDetails(authenticationdata);

    const userData = {
      Username: email,
      Pool: this.userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    return new Observable<any>(observer => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {
          console.log(result);
          observer.next(result);
          observer.complete();
        },
        onFailure: function(err) {
          console.log(err);
          observer.error(err);
        }
      })
    });
  }

  isLoggedIn() {
    return this.userPool.getCurrentUser() != null;
  }

  confirmAuthcode(code: string) {
    const user = {
      Username: this.cognitoUser.username,
      Pool: this.userPool
    };
    return new Observable<any>((observer: any) => {
      const cognitoUser = new CognitoUser(user);
      cognitoUser.confirmRegistration(code, true, function(err, result) {
        if(err) {
          console.log(err);
          observer.error(err);
        }
        console.log('confirmAuthCode() success', result);
        observer.next(result);
        observer.complete();
      })
    })
  }

  getAuthenticatedUser() {
    return this.userPool.getCurrentUser();
  }

  logOut() {
    this.getAuthenticatedUser()?.signOut();
    this.cognitoUser = null;
  }

}


