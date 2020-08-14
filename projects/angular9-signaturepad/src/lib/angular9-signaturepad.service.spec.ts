import { TestBed } from '@angular/core/testing';

import { Angular9SignaturepadService } from './angular9-signaturepad.service';

describe('Angular9SignaturepadService', () => {
  let service: Angular9SignaturepadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Angular9SignaturepadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
