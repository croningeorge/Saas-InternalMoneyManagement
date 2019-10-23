export class Country {
  id: number;
  name: any;
  code: any;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
