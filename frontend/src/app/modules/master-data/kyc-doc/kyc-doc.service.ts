import { Injectable } from '@angular/core';
import { environment } from "@env/environment";
import { HttpService } from "@app/shared";
import { Observable } from "rxjs/Observable";

const API_URL = environment.apiUrl;

@Injectable()
export class KycDocService {

  constructor(private http: HttpService) {}

  public getAllKycDoc(): any {
    console.log("mammu here");
    return this.http
      .get(API_URL + "/masters/kyc_docs")
      .map(response => {
        const kycDocs = response;
        return kycDocs;
      })
      .catch(this.handleError);
  }

  public addNewKycDoc(docName,isPrimary,docType): any {
    return this.http
      .post(API_URL + "/masters/kyc_doc", {
        name: docName,
        kyc_document_type_id:docType,
        is_primary:isPrimary
      })
      .map(response => {
        return response;
      })
      .catch(this.handleError);
  }
  public updateKycDoc(id, docName, isPrimary, docType): any {
    return this.http
      .post(API_URL + "/masters/kyc_doc/update", {
        id: id,
        name: docName,
        kyc_document_type_id: docType,
        is_primary: isPrimary
      })
      .map(response => {
        return response;
      })
      .catch(this.handleError);
  }
  public deleteKycDoc(id) {
    return this.http
      .post(API_URL + "/masters/kyc_doc/remove", {
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
