import { Component, OnInit } from "@angular/core";
import { HttpService, AlertService } from "@app/shared";
import { TermsandConditionsService } from "./termsandconditions.service";




@Component({
  selector: "app-termsandconditions",
  templateUrl: "./termsandconditions.component.html",
  styleUrls: ["./termsandconditions.component.scss"],
  providers: [HttpService, TermsandConditionsService]
})
export class TermsandconditionsComponent implements OnInit {

  terms: TermsandconditionsComponent[] = [];
  loading = false;
  model: any = {};

  constructor(
    private alertService: AlertService,
    private termsService: TermsandConditionsService
  ) {}

  ngOnInit() {
    this.loadTerms();
  }

  loadTerms() {
    this.loading = true;
    this.termsService.postTerms(
      this.model.config_name).subscribe(
        data => {
          this.model.config_name = data.data.config_value;
          this.handleSuccess(data);
        },
        error => {
          this.handleError(error);
      });
  }

  updateTerms() {
    this.loading = true;
    this.termsService
      .updateTerms(this.model.id, this.model.config_value)
      .subscribe(
        data => {
          this.handleSuccess(data);
        },
        error => {
          this.handleError(error);
        }
      );
  }
  handleSuccess(data) {
    this.loading = false;
    this.alertService.clear();
    this.alertService.success(data.message);
}
  handleError(error) {
  this.loading = false;
  this.alertService.clear();
  this.alertService.error(error.error.message);
}
}
