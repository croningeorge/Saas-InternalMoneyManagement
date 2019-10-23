export class UserTypes {
  id: number;
  name: any;
  status: any;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
