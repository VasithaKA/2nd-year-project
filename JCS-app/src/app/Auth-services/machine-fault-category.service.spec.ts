import { TestBed, inject } from '@angular/core/testing';

import { MachineFaultCategoryService } from './machine-fault-category.service';

describe('MachineFaultCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MachineFaultCategoryService]
    });
  });

  it('should be created', inject([MachineFaultCategoryService], (service: MachineFaultCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
