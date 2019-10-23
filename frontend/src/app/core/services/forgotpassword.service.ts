import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { ResponseData } from "app/models/index";

import { AppConfig } from "@app/app.config";
import { error } from "selenium-webdriver";
import { errorHandler } from "@angular/platform-browser/src/browser";
import { ResolveData } from "@angular/router/src/config";

@Injectable()
export class ForgotpasswordService {
  constructor(private http: Http, private config: AppConfig) {}

  /**
   * Sending forgot password email
   *
   * @param {string} email
   * @returns {Observable<ResponseData>}
   * @memberof ForgotpasswordService
   */
  forgotPassword(email: string): Observable<ResponseData> {
    return this.http
      .post(this.config.apiUrl + "/users/forgetpassword", { email: email })
      .map((response: Response) => {
        let res = response.json();
        if (res.success) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          // console.log("Forgot password email sent.");
          return <ResponseData>res;
        }
      });
  }

  /**
   * Validating reset password token
   *
   * @param {string} tokenValue
   * @returns {Observable<ResponseData>}
   * @memberof ForgotpasswordService
   */
  validateResetPassword(tokenValue: string): Observable<ResponseData> {
    return this.http
      .post(this.config.apiUrl + "/users/verify_token", { token: tokenValue })
      .map((response: Response) => {
        let res = response.json();
        if (res.success) {
          return <ResponseData>res;
        } else {
          console.log("Failed");
        }
      });
  }

  /**
   * Function for resetting password
   *
   * @param {string} tokenValue
   * @param {string} email
   * @param {string} password
   * @returns {Observable<ResolveData>}
   * @memberof ForgotpasswordService
   */
  resetPassword(
    tokenValue: string,
    email: string,
    password: string
  ): Observable<ResolveData> {
    return this.http
      .post(this.config.apiUrl + "/users/password/reset", {
        token: tokenValue,
        email: email,
        new_password: password
      })
      .map((response: Response) => {
        let res = response.json();
        if (res.success) {
          return <ResponseData>res;
        } else {
          console.log("Failed");
        }
      });
  }
}
