import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { Observable } from "rxjs/Observable";
import { HttpService } from "@app/shared";

const API_URL = environment.apiUrl;
@Injectable()
export class ServiceTimeService {

  constructor(private http: HttpService) {}

  public postServiceTime(config_name) {
      return this.http
      .post(API_URL + "/settings/get", {
        config_name: "serviceTime"
      })
      .map(response => {
        return response;
      })
      .catch(this.handleError);
  }

  public updateServiceTime(id, config_value): any {
    return this.http
      .post(API_URL + "/settings/create", {
        id: id,
        config_name: config_value
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
