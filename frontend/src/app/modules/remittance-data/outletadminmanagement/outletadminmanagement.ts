export class OutletAdminManagement {
  id: number;
  name: any;
  email: any;
  assignedOulet: any;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
