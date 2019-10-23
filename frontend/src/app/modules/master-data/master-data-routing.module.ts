import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CountriesComponent, KycDocTypesComponent, KycDocComponent } from "@app/modules";
import { UserTypesComponent, CurrenciesComponent, FaqComponent } from "./index";
import { FundRemarkComponent } from "@app/modules";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Master Data"
    },
    children: [
      {
        path: "user-types",
        component: UserTypesComponent
      },
      {
        path: "currencies",
        component: CurrenciesComponent
      },
      {
        path: "countries",
        component: CountriesComponent
      },
      {
        path: "kyc-doc-Type",
        component: KycDocTypesComponent
      },
      {
        path: "faq",
        component: FaqComponent

      },
      {
        path: "fund-remark",
        component: FundRemarkComponent
      },
      {
        path: "kyc-doc",
        component: KycDocComponent
      }
    ]
  }
];

/**
 * Master data routing module
 *
 * @export
 * @class MasterDataRoutingModule
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterDataRoutingModule {}
