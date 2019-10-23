import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  /**
   * Gurad for checking the authenticity of users
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns
   * @memberof AuthGuard
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem("currentUser") && localStorage.getItem("token")) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    console.log("not logged in so redirect to login page with the return url");
    this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
