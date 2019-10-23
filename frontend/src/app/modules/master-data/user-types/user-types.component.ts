import { Component, OnInit } from "@angular/core";
import { UserTypesService } from "./user-types.service";
import { UserTypes } from "./usertypes";
import { AlertService, HttpService } from "@app/shared";
@Component({
  selector: "app-user-types",
  templateUrl: "./user-types.component.html",
  styleUrls: ["./user-types.component.scss"],
  providers: [HttpService, UserTypesService]
})
export class UserTypesComponent implements OnInit {
  userTypes: UserTypes[] = [];
  statusArr = { "0": "Inactive", "1": "Active" };
  model: any = {};
  loading = false;
  delete = true;
  radioStatus = "0";
  constructor(
    private userTypeDataService: UserTypesService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.loadUserTypes();
  }

  loadUserTypes() {
    this.userTypeDataService.getAllUserType().subscribe(userTypes => {
      this.userTypes = userTypes.data;
      console.log(userTypes.data);
    });
  }
  addNewUserType() {
    this.loading = true;
    this.userTypeDataService.addNewUserType(this.model.userType).subscribe(
      data => {
        this.handleSuccess(data);
      },
      error => {
        this.handleError(error);
      }
    );
  }

  editUserType(userType) {
    this.alertService.clear();
    this.model.id = userType.id;
    this.model.userTypeEdit = userType.name;
    this.model.userTypeEditStatus = userType.status;
    this.radioStatus = userType.status;
  }

  updateCurrency() {
    this.loading = true;
    this.userTypeDataService
      .updateUserType(this.model.id, this.model.userTypeEdit, this.model.status)
      .subscribe(
        data => {
          this.handleSuccess(data);
        },
        error => {
          this.handleError(error);
        }
      );
  }

  deleteUserTypeModalOpen(userType) {
    this.delete = true;
    this.alertService.clear();
    this.model.idToBeDeleted = userType.id;
    this.model.userTypeToBeDeleted = userType.name;
  }

  deleteUserType() {
    this.loading = true;
    this.delete = false;
    this.userTypeDataService.deleteUserType(this.model.idToBeDeleted).subscribe(
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
    this.loadUserTypes();
  }

  handleError(error) {
    this.loading = false;
    this.alertService.clear();
    this.alertService.error(error.error.message);
  }

  addUserTypeClear(){
    this.alertService.clear();
    this.model = {};
  }
}
