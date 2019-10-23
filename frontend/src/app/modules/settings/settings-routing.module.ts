import { Routes, RouterModule } from "@angular/router";
import {  TermsandconditionsComponent,
          BaseurlComponent,
          ServiceTimeComponent } from "./index";
import { NgModule } from "@angular/core";

import {  } from "@app/modules/settings/service-time/service-time.component";


const routes: Routes = [
  {
    path: "",
    data: {
      title: "Setting Data"
    },
    children: [
      {
        path: "termsCondition",
        component: TermsandconditionsComponent
      },
      {
        path: "base-url",
        component: BaseurlComponent
      },
      {
        path: "service-time",
        component: ServiceTimeComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SettingRoutingModule {}
