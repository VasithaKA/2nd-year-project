import { TestBed, inject } from '@angular/core/testing';

import { ProfileTypeService } from './profileType.service';

describe('ProfileTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileTypeService]
    });
  });

  it('should be created', inject([ProfileTypeService], (service: ProfileTypeService) => {
    expect(service).toBeTruthy();
  }));
});
