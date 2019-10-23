import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { Observable } from "rxjs/Observable";
import { HttpService } from "@app/shared";

const API_URL = environment.apiUrl;
@Injectable()
export class BaseUrlService {

  constructor(private http: HttpService) {}

  public postBaseurl(config_name) {
      return this.http
      .post(API_URL + "/settings/get", {
        config_name: "base_url"
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
