import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AlertService } from "@app/shared";
import { AuthenticationService } from "@app/core";

@Component({
  moduleId: module.id,
  templateUrl: "login.component.html"
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  authError: boolean;
  logoutSuccess: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    // get force sign in param and display error message to login again
    this.authError = this.route.snapshot.queryParams["fs"] ? true : false;

    this.logoutSuccess = this.route.snapshot.queryParams["ls"] ? true : false;
  }

  /**
   * Function to handle login
   *
   * @memberof LoginComponent
   */
  login() {
    this.loading = true;
    this.authenticationService
      .login(this.model.email, this.model.password)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
          console.log(data);
        },
        error => {
          this.loading = false;
          this.alertService.clear();
          this.alertService.error("email or password is incorrect");
        }
      );
  }

  forgotPassword() {
    alert("Success..!");
  }
}
