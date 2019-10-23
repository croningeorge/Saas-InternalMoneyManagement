import { TestBed, inject } from '@angular/core/testing';

import { KycDocTypesService } from './kyc-doc-types.service';

describe('KycDocTypesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KycDocTypesService]
    });
  });

  it('should be created', inject([KycDocTypesService], (service: KycDocTypesService) => {
    expect(service).toBeTruthy();
  }));
});
