import { TestBed } from '@angular/core/testing';

import { RequestBaseServiceService } from './request-base-service.service';

describe('RequestBaseServiceService', () => {
  let service: RequestBaseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestBaseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
