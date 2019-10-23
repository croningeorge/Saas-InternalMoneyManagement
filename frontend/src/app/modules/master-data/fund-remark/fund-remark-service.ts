import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { Http, Response } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";



const API_URL = environment.apiUrl;

@Injectable()
export class FundRemarkService {

  constructor(private http: HttpClient) {}
  
  public getAllFundRemark(): any {
    return this.http
      .get(API_URL + "/masters/fund_remarks")
      .map(response => {
        const FundRemarks = response;
        return FundRemarks;
      })
      .catch(this.handleError);
  }

  public addNewFundRemark(name,id): any {
    return this.http
      .post(API_URL + "/masters/fund_remark/", {
        name: name,
        is_purpose :Boolean(parseInt(id))
       
      })
      .map(response => {
        return response;
      })
      .catch(this.handleError);
  }

  public updateFundRemark(id, FundRemark,SelectedRemark ): any {
	  return this.http
      .post(API_URL + "/masters/fund_remark/update", {
        id: id,
        name: FundRemark,
        is_purpose: Boolean(parseInt(SelectedRemark))
      })
      .map(response => {
        return response;
      })
      .catch(this.handleError);
  }


  public deleteFundRemark(id) {
    return this.http
      .post(API_URL + "/masters/fund_remark/remove", {
        id: id
      })
      .map(response => {
        return response;
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    return Observable.throw(error);
  }
  }