
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RemittanceDataRoutingModule } from "./remittance-data-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "@app/shared";
import { NgxEditorModule } from "ngx-editor";
import { OutletadminmanagementComponent,
         KyclistingComponent,
         BasecurrencymanagementComponent,
         OrdermanagementComponent,
         OutletmanagementFilterPipe,
         OutletSearchComponent,
         OutletadminFilterPipe,
         OutletmanagementComponent,
         OutletadminmanagementsearchComponent,
        } from "./index";

// Modal Component
import { ModalModule } from "ngx-bootstrap/modal";


@NgModule({
  imports: [CommonModule,
     RemittanceDataRoutingModule,
    CommonModule,
    ModalModule.forRoot(),
    FormsModule,
    SharedModule,
    NgxEditorModule
  ],
  declarations: [OutletmanagementComponent,
    OutletadminmanagementComponent,
    OrdermanagementComponent,
    KyclistingComponent,
    BasecurrencymanagementComponent,
    OutletmanagementFilterPipe,
    OutletSearchComponent,
    OutletadminFilterPipe,
    OutletadminmanagementsearchComponent,

  ],
})
export class RemittanceDataModule {}
