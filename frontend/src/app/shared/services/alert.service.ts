import { Injectable } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import { Observable } from "rxjs";
import { Subject } from "rxjs/Subject";

import { Alert, AlertType } from "@app/models";

/**
 * Class to handle the alert service
 *
 * @export
 * @class AlertService
 */
@Injectable()
export class AlertService {
  private subject = new Subject<Alert>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert messages
          this.clear();
        }
      }
    });
  }

  /**
   * Get all alerts
   *
   * @returns {Observable<any>}
   * @memberof AlertService
   */
  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  /**
   * Display success alerts
   *
   * @param {string} message
   * @param {boolean} [keepAfterRouteChange=false]
   * @memberof AlertService
   */
  success(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Success, message, keepAfterRouteChange);
  }

  /**
   * Display errors
   *
   * @param {string} message
   * @param {boolean} [keepAfterRouteChange=false]
   * @memberof AlertService
   */
  error(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Error, message, keepAfterRouteChange);
  }

  /**
   * Display info
   *
   * @param {string} message
   * @param {boolean} [keepAfterRouteChange=false]
   * @memberof AlertService
   */
  info(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Info, message, keepAfterRouteChange);
  }

  /**
   * Display warning
   *
   * @param {string} message
   * @param {boolean} [keepAfterRouteChange=false]
   * @memberof AlertService
   */
  warn(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Warning, message, keepAfterRouteChange);
  }

  /**
   * Main alert function
   *
   * @param {AlertType} type
   * @param {string} message
   * @param {boolean} [keepAfterRouteChange=false]
   * @memberof AlertService
   */
  alert(type: AlertType, message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next(<Alert>{ type: type, message: message });
  }

  /**
   * To clear all alerts
   *
   * @memberof AlertService
   */
  clear() {
    // clear alerts
    this.subject.next();
  }
}
