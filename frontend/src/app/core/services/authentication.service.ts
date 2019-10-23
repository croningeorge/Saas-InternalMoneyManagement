import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { AppConfig } from "@app/app.config";

@Injectable()
export class AuthenticationService {
  constructor(private http: Http, private config: AppConfig) {}

  /**
   * Function to handle login , set local storage items if success
   *
   * @param {string} email
   * @param {string} password
   * @returns
   * @memberof AuthenticationService
   */
  login(email: string, password: string) {
    return this.http
      .post(this.config.apiUrl + "/users/authenticate", {
        email: email,
        password: password
      })
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let res = response.json();
        if (res.success && res.data.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem(
            "currentUser",
            JSON.stringify(res.data.user.email)
          );
          localStorage.setItem("token", res.data.token);
        }
      });
  }

  /**
   * Clearing all local storage items | logout
   *
   * @memberof AuthenticationService
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
  }
}
