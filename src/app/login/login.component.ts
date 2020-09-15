import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../service/authorization.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="row">
      <div class="col-lg-4">
        <form (ngSubmit)="onSubmit(f)" #f="ngForm">

          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" ngModel="" class="form-control" required="">
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" name="password" id="password" ngModel="" class="form-control" required="">
          </div>

          <button type="submit" class="btn btn-primary">Login</button>

        </form>
      </div>
    </div>
    <br>
    <div class="row message-row" *ngIf="emailVerificationMessage">
      <div class="col-lg-8">
        <div class="alert alert-danger">
          Could not log you in.  Please verify your email and then attempt to sign in.
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailVerificationMessage = false;

  constructor(private auth: AuthorizationService,
    private route: Router) { }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.auth.signIn(email, password).subscribe(
      (data) => {this.route.navigateByUrl('/');
    }, (err) => {
      this.emailVerificationMessage = true;
    });
  }

  ngOnInit(): void {
  }

}
