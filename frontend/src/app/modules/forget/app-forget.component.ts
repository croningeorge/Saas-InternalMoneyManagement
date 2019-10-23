import { Component, OnInit, Inject } from "@angular/core";
import { ForgotpasswordService } from "@app/core";
import { error } from "selenium-webdriver";
import { ResponseData } from "app/models";
import { ModalDailog } from "@app/shared";
import { MatDialog } from "@angular/material";

@Component({
  selector: "app-app-forget",
  templateUrl: "./app-forget.component.html",
  styleUrls: ["./app-forget.component.scss"]
})
export class ForgetComponent implements OnInit {
  loading = false;

  responseData: ResponseData;

  model: any = {};
  constructor(
    private forgotPasswordService: ForgotpasswordService,
    public dialog: MatDialog
  ) {}

  openDialog(msg: string): void {
    let dialogRef = this.dialog.open(ModalDailog, {
      // width: '20%',
      data: { popUpMsg: msg }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }

  ngOnInit() {}

  forgotPassword() {
    this.loading = true;
    this.forgotPasswordService.forgotPassword(this.model.email).subscribe(
      data => {
        console.log(data);
        this.openDialog(data.message); // ('New password has been sent to the email Id.');
        this.loading = false;
      },
      error => {
        console.log("Forgot password email not sent." + error);
        this.openDialog(
          "Something went wrong. Please verify email id then try again."
        ); // TO DO - change hardcoded message
        this.loading = false;
      }
    );
  }
}
