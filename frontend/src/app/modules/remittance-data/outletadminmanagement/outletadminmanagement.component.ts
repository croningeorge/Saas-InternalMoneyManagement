import { Component, OnInit } from "@angular/core";
import { OutletAdminManagement } from "./index";
import { OutletadminManagementService } from "./outletadminmanagement.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-outletadminmanagement",
  templateUrl: "./outletadminmanagement.component.html",
  styleUrls: ["./outletadminmanagement.component.scss"],
  providers: [OutletadminManagementService]
})
export class OutletadminmanagementComponent implements OnInit {
  adminOutlets: OutletAdminManagement[] = [];
  listFilter: string;
  indLoading: boolean = false;
  msg: string;

  constructor(private outletAdminDataService: OutletadminManagementService) {}

  ngOnInit() {
    this.outletAdminDataService.getAlladmin().subscribe(adminOutlets => {
      this.adminOutlets = adminOutlets.data;
    });
  }
  /**null records alert passing */
  LoadOutlets(): void {
    this.indLoading = true;
    this.outletAdminDataService.getAlladmin().subscribe(adminOutlets => {
      this.adminOutlets = adminOutlets;
      this.indLoading = false;
    }, error => (this.msg = <any>error));
  }
  /**Filtering */
  criteriaChange(value: string): void {
    if (value !== "[object Event]") {
      this.listFilter = value;
    }
  }
}
