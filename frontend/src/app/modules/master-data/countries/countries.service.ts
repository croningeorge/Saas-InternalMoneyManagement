import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { Http, Response } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Country } from "./country";

const API_URL = environment.apiUrl;


/**
 * country related service
 * 
 * @export
 * @class CountriesService
 */
@Injectable()
export class CountriesService {
  constructor(private http: HttpClient) {}

  public getAllCountries(): any {
    return this.http
      .get(API_URL + "/masters/countries")
      .map(response => {
        const countries = response;
        return countries;
      })
      .catch(this.handleError);
  }


  /**
   * add new country
   * 
   * @param {any} country 
   * @param {any} code 
   * @param {any} allow_from 
   * @param {any} allow_to 
   * @returns {*} 
   * @memberof CountriesService
   */
  public addNewCountry(country, code, allow_from, allow_to): any {
    allow_from = allow_from ? true : false;
    allow_to = allow_to ? true : false;
    return this.http
      .post(API_URL + "/masters/countries", {
        name: country,
        code: code,
        allow_from: allow_from,
        allow_to: allow_to
        //country_id: 2
      })
      .map(response => {
        return response;
      })
      .catch(this.handleError);
  }


  /**
   * update new country
   * 
   * @param {any} id 
   * @param {any} country 
   * @param {any} code 
   * @param {any} allow_from 
   * @param {any} allow_to 
   * @returns {*} 
   * @memberof CountriesService
   */
  public updateCountry(id, country, code, allow_from, allow_to): any {
    allow_from = allow_from ? true : false;
    allow_to = allow_to ? true : false;
    return this.http
      .post(API_URL + "/masters/country/update", {
        id: id,
        name: country,
        code: code,
        // country_id: 2
        allow_from: allow_from,
        allow_to: allow_to
      })
      .map(response => {
        return response;
      })
      .catch(this.handleError);
  }


  /**
   * delete country
   * 
   * @param {any} id 
   * @returns 
   * @memberof CountriesService
   */
  public deleteCountry(id) {
    return this.http
      .post(API_URL + "/masters/country/remove", {
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
