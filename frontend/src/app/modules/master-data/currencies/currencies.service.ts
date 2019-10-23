import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { Observable } from "rxjs/Observable";

import { Currency } from "./currency";
import { HttpService } from "@app/shared";

const API_URL = environment.apiUrl;

/**
 * Services related to currency management
 *
 * @export
 * @class CurrenciesService
 */
@Injectable()
export class CurrenciesService {
  constructor(private http: HttpService) {}



  /**
   * get currency listing
   *
   * @returns {*}
   * @memberof CurrenciesService
   */
  public getAllCurrencies(): any {
    return this.http
      .get(API_URL + "/masters/currencies")
      .map(response => {
        const currencies = response;
        return currencies;
      })
      .catch(this.handleError);
  }


  /**
   * add new currency
   *
   * @param {any} currency
   * @param {any} code
   * @param {any} country_id
   * @returns {*}
   * @memberof CurrenciesService
   */
  public addNewCurrency(currency, code, country_id): any {
    return this.http
      .post(API_URL + "/masters/currency", {

        name: currency,
        code: code,
        country_id: country_id.id
      })
      .map(response => {
        return response;
      })
      .catch(this.handleError);
  }


  /**
   * updade currency details
   *
   * @param {any} id
   * @param {any} currency
   * @param {any} code
   * @param {any} countryId
   * @returns {*}
   * @memberof CurrenciesService
   */
  public updateCurrency(id, currency, code, countryId): any {
    return this.http
      .post(API_URL + "/masters/currency/update", {
        id: id,
        name: currency,
        code: code,
        country_id: countryId
      })
      .map(response => {
        return response;
      })
      .catch(this.handleError);
  }


  /**
   * delete currency
   *
   * @param {any} id
   * @returns
   * @memberof CurrenciesService
   */
  public deleteCurrency(id) {
    return this.http
      .post(API_URL + "/masters/currency/remove", {
        id: id
      })
      .map(response => {
        return response;
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.error("ApiService::handleError", error);
    return Observable.throw(error);
  }
}
