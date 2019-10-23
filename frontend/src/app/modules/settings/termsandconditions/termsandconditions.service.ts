import { Injectable } from "@angular/core";
import { environment } from "environments";
import { Observable } from "rxjs/Observable";
import { HttpService } from "@app/shared";




const API_URL = environment.apiUrl;
@Injectable()
export class TermsandConditionsService {

  loading = false;
  delete = true;
  constructor(private http: HttpService) {}


  public postTerms(config_name) {
    return this.http
      .post(API_URL + "/settings/get", {
        config_name: "terms_and_condition"
      })
      .map(response => {
        return response;
      })
      .catch(this.handleError);
  }

  public updateTerms(id, config_value): any {
    return this.http
      .post(API_URL + "/settings/create", {
        id: id,
        config_value: config_value
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
