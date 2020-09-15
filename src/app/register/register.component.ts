import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../service/authorization.service';

@Component({
  selector: 'app-register',
  template: `
    <div class="row">
      <div class="col-lg-4">
        <form (ngSubmit)="register(regform)" #regform="ngForm">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" ngModel="" class="form-control">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" name="password" id="password" ngModel="" class="form-control" required="">
          </div>
          <button type="submit" class="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
    <br>
    <div *ngIf="confirmCode" class="row message-row">
      <h3>Please check your email for the validation code and enter it here:</h3>
      <div class="col-lg-4">
        <form (ngSubmit)="validateAuthCode(codeform)" #codeform="ngForm">
          <div class="form-group">
            <label for="code">Code</label>
            <input type="text" name="code" id="code" ngModel="" class="form-control" required="">
          </div>
          <button type="submit" class="btn btn-primary">Validate Code</button>
        </form>
      </div>
    </div>
    <div *ngIf="codeWasConfirmed" class="row message-row">
      <h3>Verification Code was confirmed, please click <a routerlink="/login">here</a> to login</h3>
    </div>
  `,
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  confirmCode: boolean = false;
  codeWasConfirmed = false;
  error = '';

  constructor(private auth: AuthorizationService,
    private route: Router) { }

  register(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.auth.register(email, password).subscribe(
      (data: any) => {
        this.confirmCode = true;
      },
      (err: any) => {
        console.log(err);
        this.error = 'Registration Error hes occured';
      }
    )
  }

  validateAuthCode(form: NgForm) {
    const code = form.value.code;
    this.auth.confirmAuthcode(code).subscribe(
      (data: any) => {
        this.route.navigateByUrl('/');
        this.codeWasConfirmed = true;
        this.confirmCode = false;
      },
      (err: any) => {
        console.log(err);
        this.error = 'Confirm Authorization Error has occured';
      }
    )
  }

  ngOnInit(): void {
  }

}
