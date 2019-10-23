export class Faq {
  id: number;
  question: any;
  answer: any;
  status: any;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
