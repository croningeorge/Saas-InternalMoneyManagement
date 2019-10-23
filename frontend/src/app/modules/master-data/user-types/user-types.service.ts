import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { HttpService } from "@app/shared";
import { Observable } from "rxjs/Observable";

const API_URL = environment.apiUrl;
@Injectable()
export class UserTypesService {
  constructor(private http: HttpService) {}

  public getAllUserType(): any {
    return this.http
      .get(API_URL + "/masters/user_type")
      .map(response => {
        const userTypes = response;
        return userTypes;
      })
      .catch(this.handleError);
  }

  public addNewUserType(userType): any {
    return this.http
      .post(API_URL + "/masters/user_type/create", {
        name: userType
      })
      .map(response => {
        return response;
      })
      .catch(this.handleError);
  }

  public updateUserType(id, userTypeEdit, status): any {
    return this.http
      .post(API_URL + "/masters/user_type/update", {
        id: id,
        name: userTypeEdit,
        status: status
      })
      .map(response => {
        return response;
      })
      .catch(this.handleError);
  }

  public deleteUserType(id) {
    return this.http
      .post(API_URL + "/masters/user_type/remove", {
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
