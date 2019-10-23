export class OutletManagement {
  id: number;
  name: any;
  address: any;
  country_id: number;
  lat: any;
  lang: any;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
