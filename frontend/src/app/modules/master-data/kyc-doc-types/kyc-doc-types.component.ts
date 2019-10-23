import { Component, OnInit,ViewChild } from '@angular/core';
import { KycDocTypesService } from "./kyc-doc-types.service";
import { KycDocTypes } from "./KycDocType";
import { AlertService, HttpService } from "@app/shared";
import { ModalDirective } from "ngx-bootstrap/modal";
@Component({
  selector: 'app-kyc-doc-types',
  templateUrl: './kyc-doc-types.component.html',
  styleUrls: ['./kyc-doc-types.component.scss'],
  providers: [ HttpService, KycDocTypesService ] 
})
export class KycDocTypesComponent implements OnInit {
  kycDocTypes: KycDocTypes [] = [];
  secDocStatus = { "0": "No Need Secondary Doc", "1": "Need Secondory Doc" };
  model: any = {};
  loading = false;
  delete = true;
  isRequiredSecDocument=1;

  @ViewChild('addKycDocTypeModal') public addKycDocTypeModal: ModalDirective;
  @ViewChild('editkycDocTypeModal') public editkycDocTypeModal: ModalDirective;
  @ViewChild('deletekycDocTypeModal') public deletekycDocTypeModal: ModalDirective;
  constructor(private kycDocTypesService: KycDocTypesService,
    private alertService: AlertService) {}

  ngOnInit() {
    this.loadKocDocType();
  }
  loadKocDocType() {
    this.kycDocTypesService.getAllKycDocType().subscribe(kycDocType => {
      this.kycDocTypes = kycDocType;
      console.log(kycDocType);
    });
   }
   addNewKycDocType() {
    this.loading = true;
    if(this.model.isRequiredSecDoc == 2){
      this.isRequiredSecDocument=0;
    }
    this.kycDocTypesService.addNewKycDocType(this.model.docTypeName,this.isRequiredSecDocument,
      this.model.description).subscribe(
      data => {
        this.handleSuccess(data);
        this.addKycDocTypeModal.hide();
      },
      error => {
        this.handleError(error);
      }
    );
  }
  editKycDocType(kycDocType) {
    this.alertService.clear();
    this.model.id = kycDocType.document_type_id;
    this.model.editDocTypeName = kycDocType.name;
    this.model.editIsRequiredSecDoc = kycDocType.required_sec_doc;
    this.model.editDescription=kycDocType.message;
    console.log(kycDocType);
  }
  updateKycDocType() {
    this.loading = true;
    this.kycDocTypesService
      .updateKycDocType(this.model.id, this.model.editDocTypeName, this.model.editIsRequiredSecDoc,
        this.model.editDescription)
      .subscribe(
        data => {
          this.handleSuccess(data);
          this.editkycDocTypeModal.hide();
        },
        error => {
          this.handleError(error);
        }
      );
  }

  deletekycDocTypeModalOpen(kycDocType) {
    console.log("mammu"+kycDocType);
    this.delete = true;
    this.alertService.clear();
    this.model.idToBeDeleted = kycDocType.document_type_id;
    this.model.docTypeName = kycDocType.name;
  }
  deleteKycDocType() {
     this.loading = true;
     this.delete = false;
     this.kycDocTypesService.deleteKycDocType(this.model.idToBeDeleted).subscribe(
       data => {
         this.handleSuccess(data);
         this.deletekycDocTypeModal.hide();
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
    this.ngOnInit();
  }

  handleError(error) {
    this.loading = false;
    this.alertService.clear();
    this.alertService.error(error.error.message);
  }
  addDocTypeClear(){
    this.alertService.clear();
    this.model = {};
  }
}
