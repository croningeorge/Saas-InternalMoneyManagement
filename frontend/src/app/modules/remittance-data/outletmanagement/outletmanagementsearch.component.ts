import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-search-list",
  template: `<div class="form-inline">

              <div class="form-group">
              <div class="controls">
                <div class="input-group">
                  <input id="appendedInputButton"
                   class="form-control"
                   size="30%"
                   placeholder="Search.."
                   (paste)="getPasteData($event)"
                   (keyup)="getEachChar($event.target.value)"
                   type="text"
                   [(ngModel)]="listFilter"
                   type="text">
                  <span class="input-group-append">
                    <button class="btn btn-secondary" type="button">Go!</button>
                </span>
            </div>
        </div>
      </div>
     </div> `
})
export class OutletSearchComponent {
  listFilter: string;
  @Input() title: string;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();

  getEachChar(value: any) {
    this.change.emit(value);
  }
  getPasteData(value: any) {
    const pastedVal = value.clipboardData.getData("text/plain");
    this.change.emit(pastedVal);
    value.preventDefault();
  }
}
