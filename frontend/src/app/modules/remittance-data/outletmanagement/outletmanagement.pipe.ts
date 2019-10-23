import { PipeTransform, Pipe } from "@angular/core";
import { OutletManagement } from "./index";

@Pipe({
  name: "outletFilter"
})
export class OutletmanagementFilterPipe implements PipeTransform {
  transform(value: OutletManagement[], filter: string): OutletManagement[] {
    filter = filter ? filter.toLocaleLowerCase() : null;
    return filter
      ? value.filter(
          (app: OutletManagement) =>
            (app.id != null &&
              app.name.toLocaleLowerCase().indexOf(filter) !== -1) ||
            (app.address != null &&
              app.address.toLocaleLowerCase().indexOf(filter) !== -1)
        )
      : value;
  }
}
