import { Component, OnInit } from "@angular/core";
import { HttpService, AlertService } from "@app/shared";
import { ServiceTime } from "@app/modules/settings/service-time/service-time";
import { ServiceTimeService } from "./service-time.service";



@Component({
  selector: "app-service-time",
  templateUrl: "./service-time.component.html",
  styleUrls: ["./service-time.component.scss"],
  providers: [HttpService, ServiceTimeService]
})
export class ServiceTimeComponent implements OnInit {

  serviceTime: ServiceTime [] = [];
  loading = false;
  model: any = {};

  constructor(
    private alertService: AlertService,
    private servicetimeService: ServiceTimeService
  ) {}

  ngOnInit() {
    this.ServiceTime();
  }

  ServiceTime() {
    this.loading = true;
    this.servicetimeService.postServiceTime(
      this.model.config_name).subscribe(
        data => {
          this.model.config_name = data.data.config_value;
          this.handleSuccess(data);
        },
        error => {
          this.handleError(error);
        });
  }

  updateServiceTime() {
    this.loading = true;
    this.servicetimeService
      .updateServiceTime(this.model.id, this.model.config_value)
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

