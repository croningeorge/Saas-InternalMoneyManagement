import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { Http, Response } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

const API_URL = environment.apiUrl;

@Injectable()
export class OutletadminManagementService {
  constructor(private http: HttpClient) {}

  public getAlladmin(): any {
    return this.http
      .get(API_URL + "/masters/adminoutlet")
      .map(response => {
        const adminoutlets = response;
        return adminoutlets;
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.error("ApiService::handleError", error);
    return Observable.throw(error);
  }
}
