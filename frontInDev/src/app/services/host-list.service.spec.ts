import { TestBed } from '@angular/core/testing';

import { HostListService } from './host-list.service';

describe('HostListService', () => {
  let service: HostListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HostListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
