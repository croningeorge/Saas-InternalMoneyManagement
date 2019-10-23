import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AlertComponent } from "./directives/alert";
import { AppSearchBoxComponent } from './components';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [AlertComponent, AppSearchBoxComponent],
  providers: [],
  exports: [AlertComponent, AppSearchBoxComponent]
})
export class SharedModule {}
