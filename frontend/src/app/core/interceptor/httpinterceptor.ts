import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from "@angular/common/http";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Observable } from "rxjs/Rx";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";

import { AlertService } from "@app/shared";

/**
 * Interceptor class for adding token in each http request
 *
 * @export
 * @class Httpinterceptor
 * @implements {HttpInterceptor}
 */
@Injectable()
export class Httpinterceptor implements HttpInterceptor {
  constructor(private router: Router, private alertService: AlertService) {}

  /**
   * Intercept each http request and append x-access-token in pre flight
   *
   * @param {HttpRequest<any>} req
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   * @memberof Httpinterceptor
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("intercepted request ... ");

    const token = localStorage.getItem("token");
    // Clone the request to add the new header.
    const authReq = req.clone({
      headers: req.headers.set("x-access-token", token)
    });

    console.log("Sending request with new header now ...");

    //send the newly created request
    return next.handle(authReq).catch((error, caught) => {
      //intercept the respons error and displace it to the console
      if (error instanceof HttpErrorResponse && error.status == 401) {
        // handle 401 errors
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
        this.alertService.clear();
        this.alertService.error("Session expired, please login again");
        this.router.navigate(["login"], { queryParams: { fs: 1 } });
        return Observable.empty();
      }
      //return the error to the method that called it
      return Observable.throw(error);
    }) as any;
  }
}
