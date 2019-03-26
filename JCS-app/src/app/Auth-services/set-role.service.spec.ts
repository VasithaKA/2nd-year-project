import { TestBed, inject } from '@angular/core/testing';

import { SetRoleService } from './set-role.service';

describe('SetRoleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SetRoleService]
    });
  });

  it('should be created', inject([SetRoleService], (service: SetRoleService) => {
    expect(service).toBeTruthy();
  }));
});
