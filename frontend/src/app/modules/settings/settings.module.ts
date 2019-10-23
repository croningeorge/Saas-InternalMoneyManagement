import { NgModule } from "@angular/core";
import {  TermsandconditionsComponent,
          BaseurlComponent,
          ServiceTimeComponent } from "./index";
import { SettingRoutingModule } from "@app/modules/settings/settings-routing.module";
import { CommonModule } from "@angular/common";
import { ModalModule } from "ngx-bootstrap/modal";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "@app/shared";
import { NgxEditorModule } from "ngx-editor";


@NgModule({
  imports: [
    SettingRoutingModule,
    CommonModule,
    ModalModule.forRoot(),
    FormsModule,
    SharedModule,
    NgxEditorModule
  ],
  declarations: [
    TermsandconditionsComponent,
    BaseurlComponent,
    ServiceTimeComponent
  ]
})
export class SettingsModule { }
