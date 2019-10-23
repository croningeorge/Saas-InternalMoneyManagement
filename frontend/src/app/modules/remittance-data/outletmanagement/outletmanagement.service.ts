import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { Http, Response } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

const API_URL = environment.apiUrl;

@Injectable()
export class OutletManagementService {
  constructor(private http: HttpClient) {}

  public getAllOutlets(): any {
    return this.http
      .get(API_URL + "/masters/outlets")
      .map(response => {
        const outlets = response;
        return outlets;
      })
      .catch(this.handleError);
  }

  public addNewOutlet(name, address, country_id, lat, lang): any {
    return this.http
      .post(API_URL + "/masters/outlet", {
        name: name,
        address: address,
        country_id: 1,
        lat: 456464656,
        lang: 345345435
      })
      .map(response => {
        return response;
      })
      .catch(this.handleError);
  }

  public updateOutlet(id, name, address, countryId, lat, lang): any {
    return this.http
      .post(API_URL + "/masters/outlet/update", {
        id: id,
        name: name,
        address: address,
        country_id: 2,
        lat: 4543543543,
        lang: 2346546456
      })
      .map(response => {
        return response;
      })
      .catch(this.handleError);
  }

  public deleteOutlet(id) {
    return this.http
      .post(API_URL + "/masters/outlet/remove", {
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
