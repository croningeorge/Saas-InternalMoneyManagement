import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { Observable } from "rxjs/Observable";
import { HttpService } from "@app/shared";

const API_URL = environment.apiUrl;
@Injectable()
export class FaqService {
  constructor(private http: HttpService) {}

  public getAllQuestions(): any {
    return this.http
      .get(API_URL + "/faq/list")
      .map(response => {
        const faqs = response;
        console.log(faqs, " FAQs");
        return faqs;
      })
      .catch(this.handleError);
  }

  public addNewFaq(question, answer): any {
    return this.http
      .post(API_URL + "/faq/create", {
        question: question,
        answer: answer
      })
      .map(response => {
        return response;
      })
      .catch(this.handleError);
  }

  public updateFaq(id, question, answer, status: number): any {
    return this.http
      .post(API_URL + "/faq/update", {
        id: id,
        question: question,
        answer: answer,
        status: status
      })
      .map(response => {
        return response;
      })
      .catch(this.handleError);
  }

  public deleteFaq(id) {
    return this.http
      .post(API_URL + "/faq/delete", {
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
