import { Component, OnInit } from "@angular/core";
import { FaqService } from "./faq.service";
import { Faq } from "./faq";
import { AlertService, HttpService, SweetAlertService } from "@app/shared";

@Component({
  selector: "app-faqs",
  templateUrl: "./faq.component.html",
  styleUrls: ["./faq.component.css"],
  providers: [HttpService, FaqService, SweetAlertService]
})
export class FaqComponent implements OnInit {
  faqs: Faq[] = [];
  model: any = {};
  loading = false;
  editing = false;
  delete = false;
  statusArr = { "0": "Inactive", "1": "Active" };

  constructor(
    private faqDataService: FaqService,
    private alertService: AlertService,
    private sweetAlertService: SweetAlertService
  ) {}

  ngOnInit() {
    this.loadFaqs();
  }

  loadFaqs() {
    this.faqDataService.getAllQuestions().subscribe(faqs => {
      this.faqs = faqs.data;
    });
  }

  addNewFaq(f) {
    this.loading = true;
    this.faqDataService
      .addNewFaq(this.model.question, this.model.answer)
      .subscribe(
        data => {
          this.sweetAlertService.showSuccess('Created', data.message);
          this.handleSuccess(data);
          f.submitted = false;
        },
        error => {
          this.handleError(error);
        }
      );
  }

  editFaq(faq) {
    this.editing = true;
    this.alertService.clear();
    this.model.id = faq.id;
    this.model.editQuestion = faq.question;
    this.model.editAnswer = faq.answer;
    this.model.status = faq.status;
  }

  updateFaq() {
    this.loading = true;
    this.faqDataService
      .updateFaq(
        this.model.id,
        this.model.editQuestion,
        this.model.editAnswer,
        this.model.status
      )
      .subscribe(
        data => {
          this.sweetAlertService.showSuccess('Updated', data.message);
          this.handleSuccess(data);
        },
        error => {
          this.handleError(error);
        }
      );
  }
  openModal() {
    this.alertService.clear();
  }

  deleteFaq() {
    this.loading = true;
    this.delete = false;
    this.faqDataService.deleteFaq(this.model.idToBeDeleted).subscribe(
      data => {
        this.sweetAlertService.setApiCalling(false);
        this.sweetAlertService.showSuccess('Success', 'Deleted');
        this.handleSuccess(data);
      },
      error => {
        this.handleError(error);
    });
  }
  deleteFaqModalOpen(faq) {
      this.delete = true;
      this.alertService.clear();
      this.model.idToBeDeleted = faq.id;
      this.sweetAlertService.showDeleteConfirm('Delete?',
          'Are you sure to delete FAQ <b>' + faq.question + '</b>?',
      );
      this.sweetAlertService.getApiCallingStatus()
          .subscribe(status => {
            if(status){
              this.deleteFaq();
            }
        });
  }
  search(query: string){
    console.log(query, ' query search')
  }
  focus(query: string){
    console.log(query, ' focus event')
  }
  handleSuccess(data) {
        this.loading = false;
        this.alertService.clear();
        this.alertService.success(data.message);
        this.loadFaqs();
    }
  handleError(error) {
    this.loading = false;
    this.alertService.clear();
    this.alertService.error(error.error.message);
  }
}
