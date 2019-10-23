import { Injectable } from '@angular/core';
import { environment } from "@env/environment";
import { HttpService } from "@app/shared";
import { Observable } from "rxjs/Observable";

const API_URL = environment.apiUrl;

@Injectable()
export class KycDocTypesService {

  constructor(private http: HttpService) {}

  public getAllKycDocType(): any {
    
    return this.http
      .get(API_URL + "/masters/kyc_doc_type")
      .map(response => {
        const kycDocTypes = response.data;
        console.log(response.data);
        return kycDocTypes;
      })
      .catch(this.handleError);
  }

  public addNewKycDocType(docTypeName,isRequiredSecDoc,description): any {
    return this.http
      .post(API_URL + "/masters/kyc_doc_type", {
        name: docTypeName,
        required_sec_doc:isRequiredSecDoc,
        description:description
      })
      .map(response => {
        return response;
      })
      .catch(this.handleError);
  }

  public updateKycDocType(id, editDocTypeName, editIsRequiredSecDoc, editDescription): any {
    return this.http
      .post(API_URL + "/masters/kyc_doc_type/update", {
        name: editDocTypeName,
        required_sec_doc: editIsRequiredSecDoc,
        description: editDescription,
        id: id
      })
      .map(response => {
        return response;
      })
      .catch(this.handleError);
  }
  public deleteKycDocType(id) {
    return this.http
      .post(API_URL + "/masters/kyc_doc_type/remove", {
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
