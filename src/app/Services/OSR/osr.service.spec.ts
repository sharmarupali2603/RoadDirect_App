import { TestBed } from '@angular/core/testing';

import { OsrService } from './osr.service';

describe('OsrService', () => {
  let service: OsrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OsrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
