import { Component, OnInit } from '@angular/core';

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
              <a routerLink="/restapi">Rest Call</a>
          </li>
          <li routerLinkActive="active">
              <a routerLink="/register">Register</a>
          </li>
          <li routerLinkActive="active">
              <a routerLink="/login">Login</a>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
