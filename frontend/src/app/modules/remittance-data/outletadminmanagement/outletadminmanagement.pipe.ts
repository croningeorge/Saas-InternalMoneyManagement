import { PipeTransform, Pipe } from "@angular/core";
import { OutletAdminManagement } from "@app/modules";

@Pipe({
  name: "adminOutletFilter"
})
export class OutletadminFilterPipe implements PipeTransform {
  transform(
    value: OutletAdminManagement[],
    filter: string
  ): OutletAdminManagement[] {
    filter = filter ? filter.toLocaleLowerCase() : null;
    return filter
      ? value.filter(
          (app: OutletAdminManagement) =>
            (app.id != null &&
              app.name.toLocaleLowerCase().indexOf(filter) !== -1) ||
            (app.email != null &&
              app.email.toLocaleLowerCase().indexOf(filter) !== -1)
        )
      : value;
  }
}
