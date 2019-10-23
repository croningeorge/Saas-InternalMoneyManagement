import { Component, OnInit } from "@angular/core";
import { HttpService, AlertService } from "@app/shared";
import { BaseUrlService } from "./baseurl.service";
import { BaseUrl } from "./baseurl";



@Component({
  selector: "app-baseurl",
  templateUrl: "./baseurl.component.html",
  styleUrls: ["./baseurl.component.scss"],
  providers: [HttpService, BaseUrlService]
})
export class BaseurlComponent implements OnInit {

  baseurl: BaseUrl [] = [];
  loading = false;
  model: any = {};

  constructor(
    private alertService: AlertService,
    private baseurlService: BaseUrlService
  ) {}

  ngOnInit() {
    this.loadBaseurl();
  }

  loadBaseurl() {
    this.loading = true;
    this.baseurlService.postBaseurl(
      this.model.config_name).subscribe(
        data => {
          this.model.config_name = data.data.config_value;
          this.handleSuccess(data);
        },
        error => {
          this.handleError(error);
        });
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
