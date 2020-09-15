import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../service/authorization.service';

@Component({
  selector: 'app-header',
  template: `
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">AWS Cognito</a>
        </div>
        <ul class="nav navbar-nav">
          <li routerLinkActive="active"
              [routerLinkActiveOptions]="{exact:true}">
              <a routerLink="/">Home Page</a>
          </li>
          <li routerLinkActive="active">
              <a *ngIf="auth.isLoggedIn()" routerLink="/restapi">Rest Call</a>
          </li>
          <li routerLinkActive="active">
              <a *ngIf="! auth.isLoggedIn()" routerLink="/register">Register</a>
          </li>
          <li routerLinkActive="active">
              <a *ngIf="! auth.isLoggedIn()" routerLink="/login">Login</a>
          </li>
          <li routerLinkActive="active">
              <button *ngIf="auth.isLoggedIn()" (clcik)="doLogOut()">logout</button>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public auth: AuthorizationService,
    private route: Router) { }

  doLogOut() {
    this.auth.logOut();
    this.route.navigateByUrl('/login');
  }

  ngOnInit(): void {
  }

}
