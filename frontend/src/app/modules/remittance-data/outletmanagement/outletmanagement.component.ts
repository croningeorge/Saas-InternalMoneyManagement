import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { HttpService } from "@app/shared";
import { OutletManagement } from "./outletmanagement";
import { OutletManagementService } from "./outletmanagement.service";
import { ModalDirective } from "ngx-bootstrap/modal";
import { AlertService } from "@app/shared";

@Component({
  selector: "app-outletmanagement",
  templateUrl: "./outletmanagement.component.html",
  styleUrls: ["./outletmanagement.component.scss"],
  providers: [OutletManagementService]
})
export class OutletmanagementComponent implements OnInit {
  outlets: OutletManagement[] = [];
  listFilter: string;
  indLoading: boolean = false;
  msg: string;
  model: any = {};
  loading = false;
  delete = true;

  constructor(
    private outletDataService: OutletManagementService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.LoadOutlets();
  }

  LoadOutlets(): void {
    this.indLoading = true;
    this.outletDataService.getAllOutlets().subscribe(outlets => {
      this.outlets = outlets.data;
      this.indLoading = false;
    });
  }

  criteriaChange(value: string): void {
    if (value !== "[object Event]") {
      this.listFilter = value;
    }
  }

  addNewOutlet() {
    this.loading = true;
    this.outletDataService
      .addNewOutlet(
        this.model.name,
        this.model.address,
        this.model.country_id,
        this.model.lat,
        this.model.lang
      )
      .subscribe(
        data => {
          this.handleSuccess(data);
        },
        error => {
          this.handleError(error);
        }
      );
  }

  editOutlet(outlets) {
    this.alertService.clear();
    this.model.id = outlets.id;
    this.model.nameEdited = outlets.name;
    this.model.addressEdited = outlets.address;
  }

  updateOutlet() {
    this.loading = true;
    this.outletDataService
      .updateOutlet(
        this.model.id,
        this.model.nameEdited,
        this.model.addressEdited,
        this.model.countryEdited,
        this.model.latEdited,
        this.model.langEdited
      )
      .subscribe(
        data => {
          this.handleSuccess(data);
        },
        error => {
          this.handleError(error);
        }
      );
  }

  deleteOutletModalOpen(outlets) {
    this.delete = true;
    this.alertService.clear();
    this.model.idToBeDeleted = outlets.id;
    this.model.nameToBeDeleted = outlets.name;
  }

  deleteOutlet() {
    this.loading = true;
    this.delete = false;
    this.outletDataService.deleteOutlet(this.model.idToBeDeleted).subscribe(
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
    this.LoadOutlets();
  }

  handleError(error) {
    this.loading = false;
    this.alertService.clear();
    this.alertService.error(error.error.message);
  }
}
