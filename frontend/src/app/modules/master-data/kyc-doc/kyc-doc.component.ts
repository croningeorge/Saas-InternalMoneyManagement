import { Component, OnInit, ViewChild } from '@angular/core';
import { KycDocService } from "./kyc-doc.service";
import { KycDoc } from "./kycdoc";
import { AlertService, HttpService } from "@app/shared";
import { KycDocTypesService } from "@app/modules/master-data/kyc-doc-types/kyc-doc-types.service";
import { KycDocTypes } from "@app/modules/master-data/kyc-doc-types/KycDocType";
import { ModalDirective } from "ngx-bootstrap/modal";
@Component({
  selector: 'app-kyc-doc',
  templateUrl: './kyc-doc.component.html',
  styleUrls: ['./kyc-doc.component.scss'],
  providers: [ HttpService, KycDocService,KycDocTypesService ] 
})
export class KycDocComponent implements OnInit {
  kycDocs: KycDoc [] = [];
  kycDocTypes: KycDocTypes [] = [];
  secDocStatus = { "0": "No Need Secondary Doc", "1": "Need Secondory Doc","true":"Yes","false":"No" };
  model: any = {};
  loading = false;
  delete = true;
  isPrime=false;
  @ViewChild('addKycDocModal') public addKycDocModal: ModalDirective;
  @ViewChild('editkycDocModal') public editkycDocModal: ModalDirective;
  @ViewChild('deletekycDocModal') public deletekycDocModal: ModalDirective;
  constructor(
    private kycDocService: KycDocService,
    private alertService: AlertService,
    private kycDocTypesService: KycDocTypesService
  ) {}

  ngOnInit() {
    this.loadKocDoc();
    this.loadKocDocType();
  }
  loadKocDoc() {
    this.kycDocService.getAllKycDoc().subscribe(kycDoc => {
      this.kycDocs = kycDoc.data;
      console.log(kycDoc);
    });
   }
   loadKocDocType() {
    this.kycDocTypesService.getAllKycDocType().subscribe(kycDocType => {
      this.kycDocTypes = kycDocType;
      console.log(kycDocType);
    });
   }
   addNewKycDoc() {
    this.loading = true;
    if(this.model.isPrimary=="true"){
      this.isPrime=true;
    }
    this.kycDocService.addNewKycDoc(this.model.docName,this.isPrime,
      this.model.docType).subscribe(
      data => {
        this.handleSuccess(data);
        this.addKycDocModal.hide();
      },
      error => {
        this.handleError(error);
      }
    );
  }

  editkycDoc(kycDoc) {
    this.alertService.clear();
    this.model.id = kycDoc.id;
    this.model.editDocName = kycDoc.name;
    this.model.editIsPrimary = kycDoc.is_primary;
    this.model.editDocType=kycDoc.kyc_document_type_id;
    console.log(kycDoc);
  }
  updateKycDoc() {
    this.loading = true;
    if(this.model.editIsPrimary=="true"){
      this.isPrime=true;
    }
    this.kycDocService
      .updateKycDoc(this.model.id, this.model.editDocName, this.isPrime,
        this.model.editDocType)
      .subscribe(
        data => {
          this.handleSuccess(data);
          this.editkycDocModal.hide();
        },
        error => {
          this.handleError(error);
        }
      );
  }
  deleteKycDoceModalOpen(kycDoc) {
    this.delete = true;
    this.alertService.clear();
    this.model.idToBeDeleted = kycDoc.id;
    this.model.docName = kycDoc.name;
  }
  deleteKycDoc() {
    this.loading = true;
    this.delete = false;
    this.kycDocService.deleteKycDoc(this.model.idToBeDeleted).subscribe(
      data => {
        this.handleSuccess(data);
        this.deletekycDocModal.hide();
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
  addDocClear(){
    this.alertService.clear();
    this.model = {};
  }
}
