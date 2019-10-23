import { Component, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "modal-popup",
  templateUrl: "../modal-popup/modal-popup.html"
})
export class ModalDailog {
  constructor(
    public dialogRef: MatDialogRef<ModalDailog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
