import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}
  /**
   * function to send GET request
   *
   * @param {any} URL
   * @returns {*}
   * @memberof HttpService
   */
  public get(URL): any {
    return this.http
      .get(URL)
      .map(response => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * Function to send POST request
   *
   * @param {any} URL
   * @param {any} [PARAMS={}]
   * @returns {*}
   * @memberof HttpService
   */
  public post(URL, PARAMS = {}): any {
    console.log(PARAMS, "PARAMS");
    console.log(URL, " URL");
    return this.http
      .post(URL, PARAMS)
      .map(response => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * Common function for handling exception
   *
   * @private
   * @param {(Response | any)} error
   * @returns
   * @memberof HttpService
   */
  private handleError(error: Response | any) {
    console.error("ApiService::handleError", error);
    return Observable.throw(error);
  }
}
