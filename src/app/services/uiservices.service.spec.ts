import { TestBed } from '@angular/core/testing';

import { UIServicesService } from './uiservices.service';

describe('UIServicesService', () => {
  let service: UIServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UIServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
