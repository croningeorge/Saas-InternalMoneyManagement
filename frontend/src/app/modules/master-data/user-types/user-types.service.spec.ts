import { TestBed, inject } from "@angular/core/testing";

import { UserTypesService } from "./user-types.service";

describe("UserTypesService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserTypesService]
    });
  });

  it(
    "should be created",
    inject([UserTypesService], (service: UserTypesService) => {
      expect(service).toBeTruthy();
    })
  );
});
