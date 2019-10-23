import { TestBed, inject } from "@angular/core/testing";

import { ForgotpasswordService } from "./forgotpassword.service";

describe("ForgotpasswordService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForgotpasswordService]
    });
  });

  it(
    "should be created",
    inject([ForgotpasswordService], (service: ForgotpasswordService) => {
      expect(service).toBeTruthy();
    })
  );
});
