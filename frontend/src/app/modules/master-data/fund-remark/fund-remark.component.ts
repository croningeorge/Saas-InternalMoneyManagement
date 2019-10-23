import { Component, OnInit } from '@angular/core';
import { FundRemarkService } from "./fund-remark-service";
import { FundRemarks } from "./fundremark";
import { AlertService } from "@app/shared";
import { Remark } from './remark';




@Component({
  selector: 'app-fund-remark',
  templateUrl: './fund-remark.component.html',
  styleUrls: ['./fund-remark.component.scss'],
  providers: [FundRemarkService]
})


export class FundRemarkComponent implements OnInit {


	FundRemarks: FundRemarks[] = [];
	purposeArr = {'0':'INCOME','1':'PURPOSE'};
    model: any = {};
    loading = false;

    selectedRemark:Remark = new Remark({id: 1, name: 'PURPOSE'});
  remarks = [
     new Remark({id: 1, name: 'PURPOSE'}),
     new Remark({id: 0, name: 'INCOME'}),
   
  ];	
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																			    delete = true;

  constructor(private FundRemarkDataService: FundRemarkService,
    private alertService: AlertService) {}


  ngOnInit() {
  this.loadFundRemarks();
  }

   loadFundRemarks() {
    this.FundRemarkDataService.getAllFundRemark().subscribe(FundRemarks => {
      this.FundRemarks = FundRemarks.data;
      console.log(FundRemarks.data);
      
    });

}

 addNewFundRemark() {
    this.loading = true;
    this.FundRemarkDataService
      .addNewFundRemark(this.model.FundRemark, this.selectedRemark.id)
      .subscribe(
        data => {
          this.handleSuccess(data);
        },
        error => {
          this.handleError(error);
        }
      );

    
  }

  updateFundRemark() {
    this.loading = true;
	   this.FundRemarkDataService
      .updateFundRemark(
        this.model.id,
        this.model.FundRemarkEdit,
        this.model.selectedRemarkEdit
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

  editFundRemark(FundRemark) {
    this.alertService.clear();
    this.purposeArr = {'0':'INCOME','1':'PURPOSE'};
    this.model.id = FundRemark.id;
    this.model.FundRemarkEdit = FundRemark.name;
    this.model.selectedRemarkEdit = FundRemark.is_purpose;
  }


  deleteFundRemarkModalOpen(FundRemark) {
    this.delete = true;
    this.alertService.clear();
    this.model.idToBeDeleted = FundRemark.id;
    this.model.FundRemarkToBeDeleted = FundRemark.name;
    
  }


  deleteFundRemark() {
    this.loading = true;
    this.delete = false;
    this.FundRemarkDataService
      .deleteFundRemark(this.model.idToBeDeleted)
      .subscribe(
        data => {
          this.handleSuccess(data);
        },
        error => {
          this.handleError(error);
        }
      );
  }

  search(query: any){
    console.log(query, ' query search')
  }
  focus(event){
    console.log(event, ' focus event')
  }

  handleSuccess(data) {
    this.loading = false;
    this.alertService.clear();
    this.alertService.success(data.message);
    this.loadFundRemarks();
  }

handleError(error) {
    this.loading = false;
    this.alertService.clear();
    this.alertService.error(error.error.message);
  }

}
