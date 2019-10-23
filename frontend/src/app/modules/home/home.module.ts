import { NgModule } from "@angular/core";
import { ChartsModule } from "ng2-charts/ng2-charts";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";

import { HomeComponent } from "./index";
import { HomeComponentRoutingModule } from "./home.routing-module";

@NgModule({
  imports: [HomeComponentRoutingModule, ChartsModule, BsDropdownModule],
  declarations: [HomeComponent]
})
export class DashboardModule {}
