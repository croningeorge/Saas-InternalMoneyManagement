import {
  Directive,
  Attribute,
  forwardRef,
  Component,
  OnInit,
  Input
} from "@angular/core";
import {
  NG_VALIDATORS,
  Validator,
  Validators,
  AbstractControl,
  ValidatorFn
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ForgotpasswordService } from "@app/core";
import { error } from "selenium-webdriver";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"]
})
export class ResetPasswordComponent implements OnInit {
  isValidToken = false;
  loading = false;
  tokenValue: string;
  private sub: any;

  new_password: string;
  email: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private forgotPasswordService: ForgotpasswordService
  ) {}

  ngOnInit() {
    // Getting the token value
    this.sub = this.route.params.subscribe(params => {
      this.tokenValue = params["t"];
    });
    console.log(this.tokenValue);
    //Validating the token for password reset
    this.forgotPasswordService.validateResetPassword(this.tokenValue).subscribe(
      res => {
        console.log("Success: " + res.message);
        this.email = res.data.email;
        console.log(this.email);
        this.isValidToken = true;
      },
      error => {
        console.log("Error: " + error);
        this.isValidToken = false;
      }
    );
  }

  // Password reset
  resetPassword() {
    this.loading = true;
    this.forgotPasswordService
      .resetPassword(this.tokenValue, this.email, this.new_password)
      .subscribe(
        res => {
          console.log("Success: " + res.message);
          this.loading = false;
          this.router.navigate(["/login"]);
        },
        error => {
          console.log("Error: " + error.message);
          this.loading = false;
        }
      );
  }
}
