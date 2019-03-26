import { TestBed, inject } from '@angular/core/testing';

import { MachineFaultService } from './machine-fault.service';

describe('MachineFaultService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MachineFaultService]
    });
  });

  it('should be created', inject([MachineFaultService], (service: MachineFaultService) => {
    expect(service).toBeTruthy();
  }));
});
