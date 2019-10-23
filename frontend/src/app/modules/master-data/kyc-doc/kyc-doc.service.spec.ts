import { TestBed, inject } from '@angular/core/testing';

import { KycDocService } from './kyc-doc.service';

describe('KycDocService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KycDocService]
    });
  });

  it('should be created', inject([KycDocService], (service: KycDocService) => {
    expect(service).toBeTruthy();
  }));
});
