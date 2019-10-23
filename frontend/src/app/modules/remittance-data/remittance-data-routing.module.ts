import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


import { OrdermanagementComponent,
         KyclistingComponent,
         OutletmanagementComponent,
         OutletadminmanagementComponent,
         BasecurrencymanagementComponent
      } from "./index";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Remittance Data"
    },
    children: [
      {
        path: "outletmanagement",
        component: OutletmanagementComponent
      },
      {
        path: "outletadminmanagement",
        component: OutletadminmanagementComponent
      },
      {
        path: "ordermanagement",
        component: OrdermanagementComponent
      },
      {
        path: "kyclisting",
        component: KyclistingComponent
      },
      {
        path: "basecurrecymanagement",
        component: BasecurrencymanagementComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemittanceDataRoutingModule {}
