import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgxEditorModule } from "ngx-editor";
import { MasterDataRoutingModule } from "./master-data-routing.module";
import { UserTypesComponent } from "./user-types/user-types.component";
import { CurrenciesComponent } from "./currencies/currencies.component";
import { CountriesComponent } from "./countries/countries.component";
import { FaqComponent } from "./faq/faq.component";
import { FundRemarkComponent } from "./fund-remark/fund-remark.component";
import { SharedModule } from "@app/shared";
// Modal Component
import { ModalModule } from "ngx-bootstrap/modal";
import { KycDocTypesComponent } from "./kyc-doc-types/kyc-doc-types.component";
import { KycDocComponent } from "./kyc-doc/kyc-doc.component";

@NgModule({
  imports: [
    CommonModule,
    NgxEditorModule,
    MasterDataRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    SharedModule
  ],
  declarations: [
    UserTypesComponent,
    CurrenciesComponent,
    CountriesComponent,
    KycDocTypesComponent,
    FaqComponent,
    FundRemarkComponent,
    KycDocComponent
  ]
})
export class MasterDataModule {}
