export class Remark {
  id: number;
  name: any;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
